import { Layout } from "@/components/layout";
import axios from "axios";

export default async function verifyAdvice({params} : {params:{token:string}})
{
    const {data} = await axios.post('http://localhost:8080/verify',{
        token:params.token
    })
    return(
        <Layout>
            <div className="w-full h-full flex">
                <div className="bg-slate-100 rounded-2xl m-auto p-4 max-w-96 flex gap-y-4 flex-col ">
                    <p className="text-black text-2xl font-serif font-bold self-center">Registrado com Sucesso!</p>
                    <p className="text-black font-serif text-center">
                        Um e-mail de verificação foi enviado para seu endereço de e-mail, 
                        verifique seu e-mail para acessar todas as funcionalidades.
                    </p>
                    <a className='text-amber-500 underline self-center font-bold' href="/login"> Ir para a página de login.</a>

                </div>
            </div>
           
        </Layout>
    )
}