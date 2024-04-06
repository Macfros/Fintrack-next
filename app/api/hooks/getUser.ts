"use client"

import { getServerSession } from "next-auth/next"


import prisma from "@/libs/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions)
}

const getUser = async() => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;

  } catch (error: any) {
    return null;
  }
}

export default getUser;