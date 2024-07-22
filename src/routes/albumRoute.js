import express from 'express' ; 
import { addAlbum ,listAlbum , removeAlbum} from '../controller/albumController.js';
import upload from "../middlewares/multer.js";
const albumRouter = express.Router() ; 

albumRouter.post( '/add' , upload.single('image') , addAlbum ) ; 
albumRouter.get( '/list' , listAlbum) ; 
albumRouter.delete('/remove/:id' , removeAlbum) ; 


export default albumRouter ; 

// import { addSong, listSong , removeSong } from "../controller/songController.js";
// import express from "express";
// import upload from "../middlewares/multer.js";

// const songRouter = express.Router() ; 

// songRouter.post('/add' , upload.fields([{ name :'image' , maxCount :1 } , 
//      { name : 'audio' , maxCount : 1 } 
// ]), addSong ) ; 
// songRouter.get('/list' , listSong ) ; 
// songRouter.delete('/remove/:id' , removeSong ) ; 

// export default songRouter ; 


