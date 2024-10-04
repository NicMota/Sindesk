'use server'
import { Layout } from "@/components/layout"
import axios from "axios"
import { cookies } from "next/headers"
import {TicketsPanel} from "./panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AdminDashboard = async () => {
    const token = cookies().get("token")?.value;
    const { status, data } = await axios.get("http://localhost:8080/api/ticket", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    

    return (
        <Layout>
            <div className="flex h-full max-h-full">
                <div className="h-screen flex flex-col block bg-indigo-600 w-16 text-sm  *:cursor-pointer text-white ">
                    <p className="odd:bg-black even:bg-white even:text-black h-16 flex hover:bg-orange-700 items-center justify-center">user</p>
                    <p className="odd:bg-black even:bg-white even:text-black h-16 flex hover:bg-orange-700 items-center justify-center">tickets</p>
            
                

                </div>
               
                <TicketsPanel data={data}/>
           
            </div>
           
        </Layout>
    );
};

export default AdminDashboard;
