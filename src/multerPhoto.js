require("dotenv").config();
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk'
import { getUser } from "./users/users.utils";
const path = require('path');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_AKEY,
  secretAccessKey: process.env.AWS_SKEY,
  region: process.env.AWS_REGION,
});

const uploadPhoto = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'splace-proto',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: async (req, file, cb) => {
      const loggedInUser = await getUser(req.headers.token);
      if (!loggedInUser) {
        cb(null, "failed_" + Date.now());
      } else {
        cb(null, loggedInUser.id + "_" + Date.now() + '.' + file.originalname); // 이름 설정
      }
    }
  }),
  limits: { fileSize: 10*1024*1024},
  fileFilter: (req, file, cb) => {
    console.log(path.extname(file.originalname).toLowerCase())
    if (path.extname(file.originalname).toLowerCase() != '.png' && path.extname(file.originalname).toLowerCase() != '.jpg' && path.extname(file.originalname).toLowerCase() != '.jpeg') {
     return cb(null, false);
    }
    return cb(null, true);
   },
}, 'NONE');

export default uploadPhoto;
