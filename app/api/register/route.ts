// bcrypt
import bcrypt from 'bcrypt'

// prisma
import prisma from '@/app/libs/prismadb'

// Next Response
import { NextResponse } from 'next/server'
 
export async function POST(request: Request){
    // get request 
    const body = await request.json()

    // get email, name, password
    const {email, name, password} = body

    // bcrypt password 
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data:{
            email,name,hashPassword
        }
    })

    return NextResponse.json(user)
}