"use client"

import Image from "next/image";
import React from "react";
import { useSession,signOut } from "next-auth/react"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
interface AppProps{

} 

const NavbarLocal: React.FC<AppProps> = () => {

  const { data: session, status } = useSession();
    const registerhere = () => {
        
    }


  return (
    <Navbar>
    <NavbarBrand>
      <Image src="/logo.png" alt="logo" height={50} width={50} />
      <p className="font-bold text-inherit">Fintrack</p>
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
        <Link href="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        {!session ? (<Button as={Link} color="primary" href="/register" variant="flat">
          Register
        </Button>) : 
        <button onClick={() => signOut()}>Log Out </button>}
      </NavbarItem> 
    </NavbarContent>  
    </Navbar>
  );
};

export default NavbarLocal;