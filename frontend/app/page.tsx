'use server'
import Image from "next/image";
import { Layout } from "../components/layout";
import { GoogleSignin } from "@/components/input";
import { LoginCard } from "@/components/card";
import { getAuthServer } from "./actions";



export default async function Home() {
  
  const user = await getAuthServer();
  
  return (
   <Layout>
       
      <div className="flex h-full">
        <div className="w-2/3 h-full flex bg-slate-300">
          {!user&&<LoginCard/>}
        </div>
       
    
      </div>
       
      
       
       
   </Layout>
  );
}
