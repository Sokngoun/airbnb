import { getServerSession } from 'next-auth'

import { authOptions } from '../libs/auth' 

import prisma from "@/app/libs/prismadb"

export async function getSession(){
    return await getServerSession(authOptions)
}

export default async function getCurrentUser(){
    try{
        const session = await getSession()
        console.log(session)
        if(!session?.user?.email){
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where:{
                email: session.user.email
            }
        })

        if(!currentUser){
            return null
        }

        return currentUser
    }catch(err: any){
        return null
    }
}