'use server'
import { getServerSession } from "next-auth";
import { LogOutButton } from "./input";
import { Sidebar } from "./sidebar"
import { useAuth } from "@/app/context";
import { getAuthServer } from "@/app/actions";

export const Navbar = async () =>
{   
    const user  = await getAuthServer();
    
    return (
        <div className="w-full bg-indigo-950 px-2 flex flex-row  min-h-fit relative">
        <Sidebar logged={user? true : false}/>
        <div className="absolute end-10  h-full  flex gap-x-4">
            {!user?
                    <a href='/register' className="m-auto cursor-pointer rounded-2xl font-bold bg-amber-400 text-black p-2 w-60 text-center hover:bg-black hover:text-white transition-all duration-300">
                        registro
                    </a>
                :
                <>
                    <a href='/dashboard' className="m-auto cursor-pointer rounded-2xl font-bold bg-amber-400 text-black p-2 w-60 text-center hover:bg-black hover:text-white transition-all duration-300">
                        {user.username}
                    </a>
                    <LogOutButton/>
                </>
                
            }
        </div>
        </div>
    )
}