'use server'
import { Layout } from "@/components/layout";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Ticket } from "./ticket";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getAuthServer } from "../actions";

export default async function Dashboard()
{
   
   const token = cookies().get('token')?.value;
   const user = await getAuthServer();
   const {status,data} = await axios.get("http://localhost:8080/api/user/tickets/" + user.id,{
    headers:{
        Authorization: `Bearer ${token}`
    }
   });

    return(
        <Layout>
            <div className="flex items-center justify-center h-full">
                <div className="bg-amber-100 min-h-96 w-3/5 m-auto rounded flex flex-col justify-between border-white">
                
                    <div className="h-2/3 flex gap-y-4 flex-col">
                        
                        <h1 className="mx-auto my-4 text-3xl text-black font-bold font-serif  capitalize">{data.length > 0? 'seus tickets' : 'nenhum ticket ainda'}</h1>
                        <div className="overflow-y-auto flex flex-col p-4 max-h-72 min-h-full gap-y-4 m-auto">
                            {data.map((e,i)=>(
                                <Ticket key={i} data={e}/>
                            ))}
                        </div>
                        
                    
                    </div>
                    <div className="flex mx-auto my-4">
                        <a href='/dashboard/create' className="capitalize cursor-pointer rounded-2xl font-bold bg-amber-400 text-black p-2 w-60 text-center hover:bg-black hover:text-white transition-all duration-300">
                            criar ticket
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}