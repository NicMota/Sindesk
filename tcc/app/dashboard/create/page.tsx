'use server'
import { SubmitButton, TextInput } from "@/components/input";
import { Layout } from "@/components/layout";
import { getServerSession } from "next-auth";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { TicketForm }from "./ticketForm";
import { authConfig } from "@/lib/auth";

export default async function CreateCallPage()
{   

    const session = await getServerSession(authConfig);
    if (!session) {
        redirect('/')
    }
    return(
        <Layout>
            <div className="bg-white h-3/4 flex m-auto border-4 border-amber-400 rounded w-1/3">
                <TicketForm/>
            </div>
        </Layout>
    )
}