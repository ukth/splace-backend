require("dotenv").config();
import { config, msg } from "coolsms-node-sdk"

config.init({
  apiKey: process.env.SMS_API_KEY,
  apiSecret: process.env.SMS_API_SECRET
})

async function send (params = {}) {
  try {
    const result = await msg.send(params)
    console.log('RESULT:', result)
  } catch (e) {
    console.log('statusCode:', e.statusCode)
    console.log('errorCode:', e.error.errorCode)
    console.log('errorMessage:', e.error.errorMessage)
  }
}

export default send