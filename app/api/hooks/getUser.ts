

import { getServerSession } from "next-auth/next"


import prisma from "@/libs/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions)
}

interface SafeUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  hashedPassword?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const getUser = async() => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser : SafeUser | null  = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }

    //console.log(currentUser);

    return currentUser;

  } catch (error: any) {
    return null;
  }
}

export default getUser;