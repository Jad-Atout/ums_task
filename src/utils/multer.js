import multer from 'multer';

export default function fileUpload() {
    const storage = multer.diskStorage({
        destination:(req,res,cb)=>{
            cb(null, 'uploads');
        },
        filename:(req,file,cb)=>{
            console.log(file)
            cb(null,file.originalname)
        }
    })
    function fileFilter(req,file,cb){
        if(file.mimetype==='image/png'|| file.mimetype==='image/jpeg'){
            cb(null,true)
        }else{
            cb('invalid format',false)
        }
    }
    return multer({fileFilter,storage });

}