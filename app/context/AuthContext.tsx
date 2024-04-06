"use client"

import { SessionProvider } from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";

export default function Provider({children}: any){
    return (
        <SessionProvider>
            <NextUIProvider>
                    {children}      
            </NextUIProvider>
        </SessionProvider>
        )
}