require("dotenv").config();
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk'

const s3 = new aws.S3({ 
  accessKeyId: process.env.AWS_KEYID, //노출주의
  secretAccessKey: process.env.AWS_KEY, //노출주의
  region: process.env.AWS_REGION, //노출주의
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'splace-test',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: function(req, file, cb){
          if (!req.body.userId){
            cb(null, "failed_"+Date.now());
          } else{
            cb(null, req.body.userId + "_" + Date.now() + '.' + file.originalname); // 이름 설정
          }
        }
    })
},'NONE');
export default upload;