"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';
import {signIn} from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Type in your email",
  }),
  password: z.string().min(8, {
    message: "Type in Your secret password",
  }),
})


export default function Login() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
  
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      signIn('credentials',{...values,
        redirect: false})
        .then((callback)=> {
            if(callback?.error){
                toast.error(callback.error);
                
            }

            if(callback?.ok && !callback?.error){
                toast.success("User Logged in");
            }
        })
    }
  
    return (
      <div className="flex justify-center gap-2 align-middle">

        <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your secret Password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
          <div className="flex"><hr/>Or<hr/></div>
          <Button className="w-full bg-red-500" onClick={()=>signIn('google')}>Google</Button>
        </form>
      </Form>
      </div>
      <div>
      <Image src="/Icon.jpg" alt="logo" height={450} width={450} />
    </div>
      </div>
    )
  }
  