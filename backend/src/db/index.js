import mongoose from 'mongoose'

const connect = async ()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongo connected");
        
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
        
    }
}

export {connect}