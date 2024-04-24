"use client"

import Image from "next/image";
import React from "react";
import { useSession,signOut } from "next-auth/react"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import getUser from "@/app/api/hooks/getUser";
import { useRouter } from "next/navigation";
interface AppProps{

} 

const NavbarLocal: React.FC<AppProps> = () => {

  const { data: session, status } = useSession();
  const router = useRouter();


  return (
    <Navbar className="bg-[#f1f5f9]">
    <NavbarBrand>
      <Image src="/logo.png" alt="logo" height={50} width={50} />
      <p className="font-bold text-inherit hover:cursor-pointer " onClick={() => router.push("/")}>Fintrack</p>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="#">
          Track
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Plan
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Save
        </Link>
      </NavbarItem>
    </NavbarContent>
      <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        {!session && <Link href="/login" className="font-medium">Login</Link>}
      </NavbarItem>
      <NavbarItem>
        {!session ? (<Button as={Link}  href="/register"  className="font-medium" variant="flat">
          Register
        </Button>) :
        <div className="flex gap-3">
        <Image className="rounded-full" src={session?.user?.picture || `/placeholder.jpg`} width={40} height={10} alt="Picture" />
        <Button onClick={() => signOut()}>Log Out </Button>
        </div> }
      </NavbarItem> 
    </NavbarContent>  
    </Navbar>
  );
};

export default NavbarLocal;