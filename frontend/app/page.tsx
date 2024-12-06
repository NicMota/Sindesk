'use server'
import Image from "next/image";
import { Layout } from "../components/layout";
import { GoogleSignin } from "@/components/input";
import { LoginCard } from "@/components/card";
import { getAuthServer } from "./actions";
import Moca from './index.svg';


export default async function Home() {
  
  const user = await getAuthServer();
  
  return (
   <Layout>
       
      <div className="bg-indigo-800 h-full   flex flex-col grow ">
        <div className="w-full flex grow ">
          <div className="w-1/2 flex items-center justify-center ">
              {user? <LoggedCard user={user}/>: <UnloggedCard/>}
          </div>
          <div className="w-1/2 flex float-right bg-[url('./index.svg')] bg-no-repeat bg-contain bg-center">
                 
          </div>
        </div> 
        
      </div>
      
      
   </Layout>
  );
}
function UnloggedCard()
{
  return (
   
      <span className="flex flex-col m-4  size-fit rounded-2xl p-8 gap-y-4 text-center bg-indigo-600 ">
        <p className="text-5xl text-amber-500 font-serif font-bold">
          Bem Vindo ao Sindesk.
        </p>
        <p className="text-3xl text-amber-400 font-serif font-bold">
          O melhor atendimento ao cliente da categoria para todos
        </p>
        <a href='/login' className="hover:bg-black hover:text-amber-100 duration-300 transition-all text-2xl rounded-3xl font-bold bg-amber-400 p-4 m-auto text-amber-800 font-serif font-bold">
          Entrar no Sindesk.
        </a>
          
      </span>

  )
}
function LoggedCard({user})
{
  function Btn(title,href)
  {
    return <a href={href} className="capitalize text-2xl text-amber-800 size-fit min-w-72 mx-auto p-2 cursor-pointer font-serif bg-amber-300 rounded duration-300 transition-all hover:bg-black hover:text-amber-100 hover:scale-110"> {title} </a>
  }
  return (
    <span className="flex flex-col m-4 size-fit w-[90%] h-fit  rounded-2xl p-4 py-8 gap-y-6 text-center bg-amber-100 ">
        <p className="text-4xl text-amber-700 font-serif font-bold">Seja Bem Vindo {user.username}</p>
        {Btn('Acessar Seus Tickets','/dashboard')}
        {Btn('Criar Tickets','/dashboard/create')}
        {Btn('FAQ','/faq')}
        {user.role==='ADMIN'&&Btn('Painel do Administrador','/dashboard/admin')}
    </span>
  )
}