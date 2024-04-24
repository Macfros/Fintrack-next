'use client';

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react"
import DashBoard from "./components/DashBoard";
import MainPage from "./components/MainPage";

export default function Home() {
  const { data: session, status } = useSession()
  console.log("session",session);
  return (
    <main className="">
      <div className="">

      {session ?  <DashBoard /> : <MainPage /> }

      </div>
    </main>
  );
}
