'use server'
import { Layout } from "@/components/layout";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";

export default async function verifyAdvice({params} : {params:{token:string}})
{
    const res = await axios.post('http://localhost:8080/api/user/verify',{
        token:params.token
    })

    

    if(res.status===200){
        
        deleteCookie('token');
        return(
            <Layout>
                <div className="w-full h-full flex">
                    <div className="bg-slate-100 rounded-2xl m-auto p-4 max-w-96 flex gap-y-4 flex-col ">
                        <p className="text-black text-2xl font-serif font-bold self-center">Email Verificado!</p>
                        <p className="text-black font-serif text-center">
                            Agora você esta pronto para explorar todas as nossas funcionalidades!
                        </p>
                        <a className='text-amber-500 underline self-center font-bold' href="/login"> Ir para a página de login.</a>

                    </div>
                </div>

                
            </Layout>
        )
    }
    else
        return(
            <>algo deu errado:c</>
        )
  
  
}