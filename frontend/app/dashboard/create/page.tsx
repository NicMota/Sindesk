'use server'
import { SubmitButton, TextInput } from "@/components/input";
import { Layout } from "@/components/layout";
import { getServerSession } from "next-auth";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { TicketForm }from "./ticketForm";

export default async function CreateCallPage()
{  
    return(
        <Layout>
            <div className=" h-full flex m-auto p-2">
                <TicketForm/>
            </div>
        </Layout>
    )
}