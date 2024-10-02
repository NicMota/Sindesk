'use client'
import axios from "axios"
import { getAuthServer } from "../actions";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export function Ticket({data})
{   
    const router = useRouter();

    async function deleteTicket(id)
    {   
        const token = getCookie("token");
        console.log(id);
        await axios.delete("http://localhost:8080/api/ticket/" + id,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        router.refresh();
    }

    return (
        <div key={data.id} className="bg-indigo-700 min-w-1/3 w-2/3 ml-5 mb-2  rounded flex text-white">
            <div className="w-3/4 p-2 rounded *:break-words">
                <h1>id:{data.id}</h1>
                <h1>assunto:{data.subject}</h1>
                <h1>descrição:{data.description}</h1>
                <h1 className="lowercase">status:{data.status}</h1>
            </div> 
          <div className="m-auto cursor-pointer text-red-500" onClick={()=>deleteTicket(data.id)}>
                <p> X </p>
          </div>
        </div>
    )
}