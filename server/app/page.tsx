import Image from "next/image";
import { Layout } from "../components/layout";
import { GoogleSignin } from "@/components/input";
import { LoginCard } from "@/components/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  
  return (
   <Layout>
       
      <div className="flex h-full">
        <div className="w-2/3 h-full flex bg-slate-300">
          {!session? <LoginCard/> : <></>}
        </div>
       
    
      </div>
       
      
       
       
   </Layout>
  );
}
