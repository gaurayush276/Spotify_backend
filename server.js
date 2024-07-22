import express from 'express' ; 
import cors from 'cors' ; 
import 'dotenv/config' ;
import songRouter from './src/routes/songRoute.js';
import albumRouter from './src/routes/albumRoute.js';
import connectDB from './src/config/mongoDB.js';
import connectCloudinary from './src/config/cloudinary.js';

const app = express() ; 
const port = process.env.PORT || 8000 ; 

app.use(express.json()) ; 
app.use(cors()) ;

app.use('/api/song' , songRouter) ; 
app.use('/api/album' ,  albumRouter) ; 

 app.get('/' , (req,res)=>{
    res.json({status :"done"}) ; 
})


connectDB() ; 
connectCloudinary() ; 


app.listen(port , ()=>{
    console.log("Server Started") ;
})