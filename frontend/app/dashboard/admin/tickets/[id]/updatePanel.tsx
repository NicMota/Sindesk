'use client'

import axios from "axios"
import { getCookie } from "cookies-next";
import { useState } from "react";
import toast from "react-hot-toast";

export const UpdatePanel = ({data}) =>
{
    const [status,setStatus] = useState(data.status);
    async function updateStatus()
    {   
        console.log(data)
        const put_object = {
            id:data.id,
            subject:data.subject,
            description:data.description,
            sender:data.sender,
            status:status
        }
        const token = getCookie('token');
        console.log(token);
        try {
        
            const {status} = await axios.put("http://localhost:8080/api/ticket", put_object,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })


            if(status===200)
                toast.success("status atualizado com sucesso");
            
            console.log("Status atualizado com sucesso");
        } catch (error) {
            console.log(error)
        }
       
    }
    return(
        <div className="font-serif flex flex-col gap-y-2">
            <label>Status:</label>
            <select value={status} className="border rounded w-72 h-8 bg-amber-50 font-serif text-center border border-black" onChange={(e)=>setStatus(e.target.value)}>
                <option value='ABERTO'>
                    ABERTO
                </option>
                <option value='PENDENTE'> 
                    PENDENTE
                </option>
                <option value='FECHADO'>
                    FECHADO
                </option>
            </select>
            <div className="text-black font-bold ">
                <button className="bg-amber-400 rounded-2xl p-2 w-full transition-all duration-300 hover:bg-black hover:text-amber-100 capitalize" onClick={updateStatus}> Salvar </button>
            </div>
        </div>
      
    )
}