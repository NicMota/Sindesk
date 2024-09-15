'use server'
import { Navbar } from "./navbar";
export const Layout = ({children}) =>
{   
    
  

    return (
        <>
            <div className="bg-indigo-950 h-screen flex flex-col z-40">
                <Navbar/>
                {children} 
            </div>
            <div className="w-full relative font-thin bg-slate-900 min-h-24 flex flex-row gap-x-4 items-center p-2 ">
                <div className="flex flex-row mx-10 gap-x-8">
                    <a href="/aboutus"> Sobre nós </a> {/*adicionar link e criar pagina 'sobre nos' posteriormente */}
                    <p> ©Sindesk 2024</p>
                </div>
            </div>
        </>
    )
}