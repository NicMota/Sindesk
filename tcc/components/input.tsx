'use client'
import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import google_logo from '@/public/images/google_logo.svg';
import apple_logo from '@/public/images/apple.svg';
export const TextInput = ({name,label}) => 
{
    return(
        <div className="flex flex-col gap-y-2 w-96 text-slate-900">
            <label htmlFor={name} className="font-bold capitalize"> {label}</label>
            <input type='text' id={name} className='outline-none bg-amber-100 rounded border border-black text-slate-800 p-1' name={name}/>
        </div>
       
    )
}
export const NumberInput = ({name,label}) => 
{
    return(
        <div className="flex flex-col gap-y-2 w-96 text-slate-900">
            <label htmlFor={name} className="font-bold capitalize"> {label}</label>
            <input type='number' step='1' min='1' max='10' id={name} className='outline-none bg-amber-100 rounded border border-black text-slate-800 p-1' name={name}/>
        </div>
        
    )
}
export const TextArea = ({name,label})=>
{
    return(
        <div className="flex flex-col gap-y-2 w-96 text-slate-900">
            <label htmlFor={name} className="font-bold capitalize"> {label}</label>
            <textarea  id={name} className='outline-none bg-amber-100 rounded border border-black h-24 resize-none text-slate-800 p-1' name={name}/>
        </div>
       
    )
}
export const SubmitButton = () =>
{
    return(
        <button type='submit' className="bg-amber-300 text-slate-800 font-bold capitalize w-full p-2 rounded-xl my-2 hover:bg-black hover:text-white transition-all ease-in-out duration-300">
            enviar
        </button>
    )
}
export const GoogleSignin = () =>
{   
    const handleClick = () =>
    {
        signIn("google");
    }
    return(
        <button onClick={handleClick} className="bg-white flex justify-center items-center w-12 h-12  h-fit p-1 border rounded-2xl  border-black  hover:bg-indigo-800 duration-300  ">
            <Image src={google_logo} width={30} height={30} alt="google"/>
        </button>
    )

    
}

export const LogOutButton = () =>
{
    return (
        <button onClick={() => signOut()} className="m-auto cursor-pointer rounded-2xl font-bold bg-red-500 text-black p-2 w-20 text-center hover:bg-black hover:text-white transition-all duration-300">
            Log out
        </button>
    )
}

