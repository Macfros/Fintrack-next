import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';


export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
      
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
          name: "credentials",
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" },
            username: { label: "Username", type: "text", placeholder: "John Smith" },
          },
          async authorize(credentials: any,req): Promise<any>{
           try{
            if(!credentials.email || !credentials.password) {
              throw new Error("please enter email and password");
            }

            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            });

            if(!user || !user?.hashedPassword){
              return new Error("User doesn't exists");
            }
            

            const passwordsMatched = bcrypt.compare(credentials.password, user.hashedPassword as string);

            if(!passwordsMatched){
              return new Error("Passwords don't match");
            }

            return user;
           }catch (error) {
            return null;
           }
            
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    callbacks: {
      session({ session, token, user }) {
        session.user.id = token.id;
        session.user.email= token.email;
        return session // The return type will match the one returned in `useSession()`
      },
      jwt({token,account,user}){
        if (account) {
          token.accessToken = account.access_token;
          token.id = user.id;
          token.username = (user as User).email;
          console.log({ user });
        }
        return token;
      }
    },   
    debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }