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
        router.push("/dashboard")
        router.refresh();
    }
    function redirect(id){
        router.push('/dashboard/tickets/'+id)      
    }
    return (
        
            <div key={data.id} onClick={()=>redirect(data.id)} className={`${data.status === 'ABERTO' && 'bg-indigo-300' || data.status==='PENDENTE'&&'bg-amber-400' || data.status==='FECHADO' && 'bg-red-400'} border-black border w-96 w-2/3 cursor-pointer rounded flex text-white`}>
                <div className="w-3/4 p-2 rounded text-black font-serif font-thin *:break-words">
                    
                    <h1>Assunto: {data.subject}</h1>
                    <h1 className="break-words">Descrição: {data.description}</h1>
                    <h1 className="capitalize">Status: {data.status.toLowerCase()}</h1>
                </div> 
                <div className="m-auto border border-black capitalize cursor-pointer text-black p-2 rounded-2xl font-bold font-serif bg-red-400 hover:bg-black hover:text-white duration-300 transition-all" onClick={()=>deleteTicket(data.id)}>
                        <p> deletar </p>
                </div>
            </div>
        
    )
}