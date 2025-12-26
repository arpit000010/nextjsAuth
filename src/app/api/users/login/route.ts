import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){

    try{

        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})

        if (!user.isVerified) {
            console.log('please verify your email before login')
            return NextResponse.json(
                { error: "Please verify your email before login" },
                { status: 403 }
            )
        }


        if(!user)
            return NextResponse.json(
                {
                    error: "User does not exit"
                },
                {
                    status: 400
                }
            )

        // Validate password
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword)
            return NextResponse.json(
                {
                    error: "Invalid Password",
                },
                {
                    status: 400
                }
            )

        // once user and password is varified, now we need to create token (it can be jwt) and send it to client in it's cookies

        // token data (payload)
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        // set to user cookie
        const response = NextResponse.json({
            message: 'Login successful',
            success: true
        })

        response.cookies.set(
            'token', 
            token,
            {
                httpOnly: true,
            }
        )

        return response


    } catch(error: any){
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        )
    }


}


