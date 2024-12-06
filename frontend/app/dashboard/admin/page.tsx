'use server'
import { Layout } from "@/components/layout"
import axios from "axios"
import { cookies } from "next/headers"
import {AdminPanel} from "./panel";
import toast from "react-hot-toast";


export const AdminDashboard = async () => {
    const token = cookies().get("token")?.value;
    const {  data : tickets} = await axios.get("http://localhost:8080/api/ticket", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const { data:users} = await axios.get("http://localhost:8080/api/user",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const {data:faq_topics} = await axios.get("http://localhost:8080/api/topic");

    const {data:closed} = await axios.get("http://localhost:8080/api/ticket/count/FECHADO");

    const {data:pending} = await axios.get("http://localhost:8080/api/ticket/count/PENDENTE");

    const {data:open} = await axios.get("http://localhost:8080/api/ticket/count/ABERTO");
    
    return (
        <Layout>
            <AdminPanel faq_topics={faq_topics} tickets={tickets} users={users} closed={closed} pending={pending} open={open}/>    
        </Layout>
    );
};

export default AdminDashboard;
