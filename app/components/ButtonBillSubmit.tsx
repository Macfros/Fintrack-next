"use client";
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const ButtonBillSubmit = ({value, ...props}: any) => {
    const { pending } = useFormStatus();
    return (
        <Button color="success" className="text-white" type='submit' disabled={pending} {...props}>
            {pending? "Loading.." : value}
        </Button>
    )
}

export default ButtonBillSubmit;