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
        <div className="w-full px-2 flex flex-row min-h-fit relative">
            <Sidebar logged={user? true : false}/>
            <div className="absolute z-40 end-10 self-center h-fit font-serif flex gap-x-4">
                {!user? <>
                            <a href='/login' className="m-auto cursor-pointer rounded-2xl capitalize font-serif font-bold bg-amber-400 text-amber-900 p-2 w-32 text-center hover:bg-black hover:text-amber-100 transition-all duration-300">
                                login
                            </a>
                            <a href='/register' className="m-auto cursor-pointer rounded-2xl capitalize font-serif font-bold bg-amber-400 text-amber-900 p-2 w-32 text-center hover:bg-black hover:text-amber-100  transition-all duration-300">
                                registro
                            </a>
                
                        </>
                    
                    :
                        <>
                            <a href='/dashboard' className="m-auto cursor-pointer rounded-2xl font-bold bg-amber-400 text-black p-2 min-w-32 w-fit text-center hover:bg-black hover:text-amber-100  transition-all duration-300">
                                {user.username}
                            </a>
                            <LogOutButton/>
                        </>
                    
                }
            </div>
        </div>
    )
}