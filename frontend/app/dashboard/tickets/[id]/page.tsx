
import { getAuthServer } from "@/app/actions";
import { Layout } from "@/components/layout";
import axios from "axios";
import { cookies } from "next/headers";
import { Chat } from "./chat";
import { convertDatetime } from "./util";
export default async function Page({params} : {params:{id:String}}){

    const token = cookies().get("token")?.value;
    const {status,data} = await axios.get(`http://localhost:8080/api/ticket/${params.id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }   
    })

    const user = await getAuthServer();
    if(user.sub != data.sender.email)
        return(
            <>
                  <h1> Você não enviou esse ticket</h1>
                  <a href='/' className="text-blue-200 underline"> voltar para pagina inicial</a>
            </>
        )
    return(
        <Layout>
            <div className="w-full h-full max-h-full flex flex-row bg-amber-100">
                <div className="w-1/2 flex grow">
                    <Chat sender={user} recipient={data.sender} ticketId={data.id}/>
                </div>
                <div className="flex flex-row w-1/2 justify-between"> 
                    <div className="w-1/3  m-auto h-2/3  max-h-min gap-y-2 overflow-auto  text-amber-900 flex bg-amber-200 p-3 min-w-min rounded flex-col ">
                       <DescItem label='Assunto' data={data.subject}/>
                       <DescItem label='Descrição' data={data.description}/>
                       <DescItem label='Data de Criação' data={convertDatetime(data.createdAt)}/>
                       <DescItem label='Status' data={data.status}/>
                       <DescItem label='Tags' data={['Tecnologia','Compras']}/>
                    </div>
                    <div className="w-1/3 p-3 h-full bg-amber-300 border-l-2 border-amber-800 ">
                        <Links/>
                    </div>
                    
                </div>
            </div>
        </Layout>
    )
}
function Links()
{   

    return(
        <span className="text-amber-700 font-serif flex flex-col gap-y-2 my-2 ">
            <p className="text-xl font-semibold">Artigos Relacionados: </p>
            <ol className='list-inside list-decimal ml-3 text-indigo-600 gap-y-4 flex flex-col underline ' >
                <li className="max-h-24 h-fit w-fit max-w-48 break-words text-wrap truncate hover:w-fit overflow-hidden my-2">
                    <a className='text-wrap truncate' href='/faq'> asd</a>
                </li>
                <li>
                    <a href='/faq'> asd </a>
                </li>
                <li>
                    <a href='/faq'> asd </a>
                </li>
            </ol>
        </span>
    )
}
function DescItem({label, data})
{   
    if(Array.isArray(data))
        return(
            <span className=" text-left  font-serif  text-xl">
                <label className="font-bold capitalize"> {label} </label>
                <p className="rounded bg-amber-100 min-w-30 border border-black h-fit p-2  ">
                    {data.map((d,i)=> <> {d},</>)}
                </p>
            </span>
        )
    
    return(
        <span className=" text-left  w-fit font-serif   text-xl">
            <label className="font-bold capitalize"> {label} </label>
            <p className="rounded bg-amber-100 max-h-28 overflow-y-auto min-w-30 border border-black h-fit p-2  ">
                {data}
            </p>
        </span>
    )
}