import { getAuthServer } from "@/app/actions";
import { Layout } from "@/components/layout";
import axios from "axios";
import { cookies } from "next/headers";
import { Chat } from "./chat";
import { SubmitButton } from "@/components/input";
import { UpdatePanel } from "./updatePanel";


const Page = async ({params} : {params:{id:string}}) =>
{   
    const token = cookies().get("token")?.value;
    const {status,data} = await axios.get(`http://localhost:8080/api/ticket/${params.id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }   
    })

    const user = await getAuthServer();

    

    console.log(data);
    return(
        <Layout>
            <div className="flex flex-row bg-indigo-200 h-full ">
                <div className="flex flex-col justify-center font-serif grow gap-y-4 py-6 w-1/6 min-w-fit text-black font-thin">
                    <div className="mx-auto  flex flex-col gap-y-2">
                        <label> Email: </label>
                        <p className="border rounded-2xl bg-amber-50 border-black p-2 w-48 min-w-fit"> {data.sender.email} </p>
                    </div>
                    <div className="mx-auto flex flex-col gap-y-2">
                        <label> Login: </label>
                        <p className="border rounded-2xl bg-amber-50 border-black p-2 w-48"> {data.sender.login} </p>
                    </div>
                    <div className="mx-auto  flex flex-col gap-y-2">
                        <label> Número de Telefone: </label>
                        <p className="border rounded-2xl bg-amber-50 border-black p-2  w-48"> {data.sender.number} </p>
                    </div>
                    
                </div>
                
                <Chat sender={user} recipient={data.sender} ticketId={data.id}/>
                <div className="flex flex-col grow  font-serif  w-1/4 gap-y-4 py-6 ">
                    <div className="mx-auto text-black gap-y-2">
                        <label> Assunto </label>
                        <p className=" bg-amber-50 break-words border rounded-2xl border-black p-2  w-72">{data.subject}</p>
                    </div>
                    <div className="mx-auto text-black gap-y-2 ">
                        <label> Descrição </label>
                        <p className="break-words border bg-amber-50 max-h-40 overflow-y-auto  scroll-my-40  rounded-2xl border-black p-4 w-72 ">{data.description}</p>
                    </div>

                    <div className='mx-auto text-black flex flex-col gap-y-2'>
                        <UpdatePanel data={data}/>                        
                    </div>
                   
                </div>
            </div>
            

        </Layout>
    )
}
export default Page;