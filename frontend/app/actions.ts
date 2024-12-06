'use server'

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"

interface JwtPayload {
    sub?: string;
    username?: string;
    id?:string;
    exp?: number;
    verified?:string;
}
export const getAuthServer = async () =>
{
    const token = cookies().get('token')?.value;
    if(token==null)
        return;
    try {
        const user = jwtDecode<JwtPayload>(token);
        console.log(user);
        return user;
    } catch (error) {
        console.log(error.message);
    }


   
}