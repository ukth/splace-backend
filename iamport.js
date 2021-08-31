var Iamport = require('iamport');
require("dotenv").config();

var iamport = new Iamport({
  impKey: process.env.IMPKEY,
  impSecret: process.env.IMPSECRET
});

export default iamport;