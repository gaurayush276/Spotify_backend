import multer from 'multer' ;
const storage = multer.diskStorage({
    filename : function( req , file , callback ){
        callback( null , file.originalname)
        // console.log( "----->" + file.originalname);
        // console.log( file );
        // ----->img1.jpg
        // ----->song3.mp3

//         ----->img1.jpg
// {
//   fieldname: 'image',
//   originalname: 'img1.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg'
// }
// ----->song3.mp3
// {
//   fieldname: 'audio',
//   originalname: 'song3.mp3',
//   encoding: '7bit',
//   mimetype: 'audio/mpeg'
// }
    }
})

const upload = multer({storage}) ; 
 
export default upload ;   