import mongoose from "mongoose";

export async function connect(){

    try{

        if(mongoose.connection.readyState >= 1)
            return
    
        await mongoose.connect(process.env.MONGO_URI!)

        console.log('MongoDB connected')

    } catch (err) {
        console.log('Something goes wrong...')
        console.log(err)
        throw err
    }

}
