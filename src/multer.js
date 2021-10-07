require("dotenv").config();
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk'
import { getUser } from "./users/users.utils";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_AKEY,
  secretAccessKey: process.env.AWS_SKEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'splace-proto',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: async (req, file, cb) => {
      try {
        const loggedInUser = await getUser(req.headers.token);
      } catch (e) {
        loggedInUser = null;
      }
      if (!loggedInUser) {
        cb(null, "failed_" + Date.now());
      } else {
        cb(null, loggedInUser.userId + "_" + Date.now() + '.' + file.originalname); // 이름 설정
      }
    }
  })
}, 'NONE');
export default upload;
