
import mongoose from 'mongoose'

const connectDB=async ()=>{
    try {
        const conn=mongoose.connect(process.env.ATLAS_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })

        console.log(`mongoDB connected: ${(await conn).connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

export default connectDB