import mongoose from "mongoose";


const connectDB =async ()=>{
   await  mongoose.connect(process.env.CONNECTING_STRING).then( r=> console.log("MongoDb Connected")) ;
}

export default connectDB ;