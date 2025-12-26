// if i am using server component then this is good approach 
// domain.com/verifytoken/assasasdfdgfdffg

// if i am using client component then this is good approach 
// domain.com/verifytoken?token=adadfdf 
// becuz i can use window.location.search to extract data

import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}:any)=>{

    try{
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // update user
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, 
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }
        else if(emailType === 'RESET') { 
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            secure: false, // Use true for port 465, false for port 587
            auth: {
                user: "fe68d0361902c1",
                pass: "4296b36c6de5bd",
            },
        })

        const mailOptions = {
            from: 'arpit@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VERIFY' ? 'verify your email' : 'reset your password'}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions)

        return mailresponse

    } catch (error:any){
        throw new Error(error.message)
    }

}


