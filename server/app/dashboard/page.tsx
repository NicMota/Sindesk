import { Layout } from "@/components/layout";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard()
{
    const session = await getServerSession(authConfig);

    if (!session) {
        redirect('/')
    }

    return(
        <Layout>
            <div className="bg-indigo-200 h-4/5 w-4/5 m-auto rounded border flex border-white">
                <div className="w-2/3 h-full bg-indigo-300 flex flex-col">
                    <h1 className="text-7xl text-slate-100 mx-auto my-5">Seus Tickets:</h1>
                </div>
                <div className="w-1/3 flex flex-col ">
                    <a href='/dashboard/create' className="capitalize  m-auto cursor-pointer rounded-2xl font-bold bg-amber-400 text-black p-2 w-60 text-center hover:bg-black hover:text-white transition-all duration-300">
                        criar ticket
                    </a>
                </div>
            </div>
        </Layout>
    )
}