'use server'

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db";
import {z} from 'zod';
import bcrypt from 'bcrypt';
const salt = 'asdasdasdakjashdaghjdgajhgdj';
const newUser = z.object({
  email:z.string(),
  user:z.string(),
  senha:z.string(),
  confirmar_senha:z.string(),
  telefone:z.string()
})

export const POST = async (req: NextRequest) =>
{
    const formData = await req.formData();
    
  const parse = newUser.safeParse({
    email:formData.get('email'),
    user:formData.get('usuario'),
    senha:formData.get('senha'),
    confirmar_senha:formData.get('confirmar_senha'),
    telefone:formData.get('telefone')
  })
  if(!parse.success)
    return{message:'falha no registro'}

  const data = parse.data;

  if(data.senha!=data.confirmar_senha)
    return NextResponse.json({message:'senhas nao coincidem'},{status:400},);
  
  const res = await prisma.user.findUnique({where:{email:data.email}});
  if(res)
    return NextResponse.json({message:'emails ja existem '},{status:400},);

  const hashedPassword = await bcrypt.hash(data.senha,10);

  try {
    const res = await prisma.user.create({data:{email:data.email, username:data.user, password:hashedPassword, cellphone:data.telefone}});
    if(res)
      return NextResponse.json({message:'deu certo'},{status:200});
  } catch (error) {
    return NextResponse.json({status:400, message:'erro no registro'})
  }
}