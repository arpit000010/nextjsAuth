import mongoose from "mongoose";


export async function connect(){

    try{

        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        // if connection is successful
        connection.on('connected', ()=>{
            console.log("MongoDB connected successfully")
        })

        // if connection is unsuccessful
        connection.on('error', (err)=>{
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
            process.exit()
        })


    } catch (err) {
        console.log('Something goes wrong...')
        console.log(err)
    }

}
