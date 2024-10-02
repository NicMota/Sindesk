'use server'
import { Layout } from "@/components/layout"
import axios from "axios"
import { cookies } from "next/headers"

export const AdminDashboard = async () => {
    const token = cookies().get("token")?.value;
    const { status, data } = await axios.get("http://localhost:8080/api/ticket", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
        }).format(date);
    };

    return (
        <Layout>
            <div className="h-screen w-fit max-w-3/5 overflow-x-auto">
                <table className='table-fixed border text-left rounded bg-indigo-600 text-sm'>
                    <thead className="bg-indigo-600">
                        <tr><th>Status</th><th>Assunto</th><th>Solicitante</th><th>Data</th><th>prioridade</th></tr>
                    </thead>
                    <tbody className="bg-indigo-200">
                        {data.map((e, i) => (
                            <tr key={i} className="odd:bg-indigo-300 *:text-center *:p-1 *:max-w-fit overflow-auto max-h-8 space-x-4 text-black font-bold border-white border hover:bg-indigo-600 cursor-pointer">
                                <td><p className="break-words  max-w-16 overflow-auto">{e.status}</p></td>
                                <td><p className="break-words  max-w-28 overflow-auto">{e.subject}</p></td>
                                <td><p className="break-words  max-w-40  overflow-auto">{e.sender.email}</p></td>
                                <td><p className="break-words  max-w-40 overflow-auto">{formatDate(e.createdAt)}</p></td>
                                <td>Urgente</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
