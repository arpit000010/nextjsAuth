import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest){

    try{

        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        // check if user already exists 
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json(
                {
                    error: "user already exists"
                },
                {
                    status: 400
                }
            )
        }

        // if user doesn't exits lets first hash password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        // create a new user using model
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json(
            {
                message: 'User created successfully',
                success: true,
                savedUser
            },
            {
                status: 200
            }
        )


    } catch (error: any) {
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
