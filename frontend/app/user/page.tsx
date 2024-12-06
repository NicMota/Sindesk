'use server'

import { Layout } from "@/components/layout"
import axios from "axios";
import { getAuthServer } from "../actions";
import { cookies } from "next/headers";

export default async function Page()
{   
    const token = cookies().get("token");

    const {id} = await getAuthServer() || {};

    console.log(id);
  
    const {data:user} = await axios.get('http://localhost:8080/api/user/'+id,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    return(
        <Layout>
            <div className="h-full flex bg-amber-50">
                <div className="bg-indigo-100 m-8 rounded p-4 size-fit">
                    {/* user info */}
                    <span className="font-serif  text-indigo-900">
                        <p className="text-xl"> username: {user.username} </p>
                        <p className="text-xl bg-green-300 p-1 rounded size-fit text-indigo-600"> {user.verified? 'verificado' : 'nao verificado' } </p>
                    </span>
                </div>
                
            </div>
        </Layout>
    )
}
