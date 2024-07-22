import {v2 as cloudinary} from 'cloudinary' ; 
import mongoose, { Schema } from 'mongoose';


const albumSchema = new Schema({
    name :{ type : String , required :true },
    desc :{ type : String , required :true },
    bgColor :{ type : String , required :true },
    image :{ type : String , required :true },
})


const albumModel = mongoose.models.album || mongoose.model("album" , albumSchema ) ; 

const addAlbum =async(req, res)=>{
try{
    const name = req.body.name ; 
    const desc = req.body.desc ; 
    const bgColor = req.body.bgColor ; 
    const imageFile = req.file ; 
    const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type :"image"} );
    const albumData  = {
        name , 
        desc ,
        bgColor,
        image : imageUpload.secure_url,

    }

    const album = albumModel(albumData) ;
    await album.save() ; 
    res.json(albumModel) ;
}
catch{e =>
    res.json({ status : e }) 
}
    
}

const listAlbum =async(req, res)=>{
    const data = await albumModel.find() ; 
    res.json(data) ; 


}

const removeAlbum =async(req, res)=>{
    const id = req.params.id ; 
    const element = await albumModel.findByIdAndDelete(id) ; 
    const data = await albumModel.find() ; 
    res.json(data) ; 
     

}

export { addAlbum , listAlbum , removeAlbum } ; 