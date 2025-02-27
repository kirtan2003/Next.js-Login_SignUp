import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        const connection = mongoose.connection
        connection.on('connected', ()=> {
            console.log('Connected to MongoDB')
        })
        connection.on('error', (err)=> {
            console.log("MongoDB connection error, please make sure db is up and running" + err);
            process.exit();
        })
    } catch (error) {
        console.log("Connection failed: ", error)
    }
}