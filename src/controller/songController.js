import { v2 as cloudinary } from "cloudinary";
import mongoose, { Schema } from "mongoose";

const songSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  album: { type: String, required: true },
  image: { type: String, required: true },
  file: { type: String, required: true },
  duration: { type: String, required: true },
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);



const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)} : ${Math.floor(
      audioUpload.duration % 60  )}`;
    // console.log(req.files) ;
    // image: [
    //   {
    //     fieldname: 'image',
    //     originalname: 'img1.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: 'C:\\Users\\gaura\\AppData\\Local\\Temp',
    //     filename: 'img1.jpg',
    //     path: 'C:\\Users\\gaura\\AppData\\Local\\Temp\\img1.jpg',
    //     size: 14764
    //   }
    // ],
    // audio: [
    //   {
    //     fieldname: 'audio',
    //     originalname: 'song3.mp3',
    //     encoding: '7bit',
    //     mimetype: 'audio/mpeg',
    //     destination: 'C:\\Users\\gaura\\AppData\\Local\\Temp',
    //     filename: 'song3.mp3',
    //     path: 'C:\\Users\\gaura\\AppData\\Local\\Temp\\song3.mp3',
    //     size: 3330853
    //   }
    // ]

    // console.log( name , desc , album , audioFile , imageFile , audioUpload , imageUpload  ) ;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = songModel(songData);
    await song.save();
    res.json(song);
  } 
  
  
  catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const listSong = async (req, res) => {
  const data = await songModel.find();
  res.json(data);
};

const removeSong = async (req, res) => {
  const id = req.params.id;
  try{
    await songModel.findByIdAndDelete(id);
   res.json({status: "done"} );

  }

  catch {
    res.json({status: "failed"});
  }
};

export { addSong, listSong ,removeSong};
