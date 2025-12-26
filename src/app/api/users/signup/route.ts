import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'



export async function POST(request: NextRequest){
    console.log("MONGO_URI : ", process.env.MONGO_URI)
    await connect();
    try{

        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)
        if (!username || !email || !password) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }


        // check if user already exists 
        const user = await User.findOne({email})

        if(user){
            console.log("User already exits")
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

        // // send verification email to user
         await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

        return NextResponse.json(
            {
                message: 'User created successfully',
                success: true,
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
