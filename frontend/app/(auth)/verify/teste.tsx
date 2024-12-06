
import { Layout } from "@/components/layout";
import { useRef } from "react";
import React from "react"; // Importa React para o `forwardRef`

export default function EmailVerificationPage() {
    

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-full">
      
                <form className="bg-slate-100 flex flex-col  gap-y-4 rounded p-3">
                    <p className="text-black">
                        Confirme seu Email
                    </p>
                    <div className="flex gap-x-4 ">
                        {Array.from({length:6},(_,e)=><NumberInput/>)}
                    </div>
                    <button className='bg-amber-400 mx-auto p-1 font-thin font-serif hover:bg-black hover:text-white duration-300 transition-all rounded-2xl text-black' type="submit">
                        confirmar
                    </button>
                </form>
     
            </div>
        </Layout>
    );
}

function NumberInput()
{
    return(
        <input className='size-9 text-center text-black bg-amber-100 border border-slate-700' type="text" maxLength={1} pattern="[0-9]*"/>
    )
}