'use server'
import Image from "next/image";
import { Layout } from "../components/layout";
import { GoogleSignin } from "@/components/input";
import { LoginCard } from "@/components/card";



export default async function Home() {
  
 
  
  return (
   <Layout>
       
      <div className="flex h-screen">
        <div className="w-2/3 h-full flex bg-slate-300">
          <LoginCard/>
        </div>
       
    
      </div>
       
      
       
       
   </Layout>
  );
}
