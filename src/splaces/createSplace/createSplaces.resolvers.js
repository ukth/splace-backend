import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import axios from "axios";
require("dotenv").config();

export default {
  Mutation: {
    createSplaces: protectedResolver(async (
      _,
      { name, lat, lon, detailAddress },
      { loggedInUser }
    ) => {
      try {
        if(name > 30) {
          return {
            ok: false,
            error: "ERROR1415"
          }
        }
        const ID = process.env.NCP_API_ID
        const KEY = process.env.NCP_API_KEY
        const headers = {
          "headers": {
            "X-NCP-APIGW-API-KEY-ID": ID,
            "X-NCP-APIGW-API-KEY": KEY,
          }
        }
        const reverseGeocode = await axios.get(encodeURI("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?orders=roadaddr&output=json&coords=" + lon + "," + lat), headers);
        
        if(reverseGeocode.data.status.name != "ok"){
          return {
            ok: false,
            error: "ERROR1414"
          }
        }
        if(reverseGeocode.data.results.length != 1){
          return {
            ok: false,
            error: "ERROR1414"
          }
        }
        const region = reverseGeocode.data.results[0].region
        const address = region.area1.alias + " " + region.area2.name + " " + reverseGeocode.data.results[0].land.name + " " + reverseGeocode.data.results[0].land.number1
        const a = await client.splace.create({
          data: {
            name,
            lat,
            lon,
            address,
            detailAddress,
            activate: false,
          },
        });
        return {
          ok: true,
          splace: a
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4411",
        };
      }
    }),
  }
};
