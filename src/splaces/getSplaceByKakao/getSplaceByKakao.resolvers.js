import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"
import axios from "axios"
import { buildSchema } from "graphql";
require("dotenv").config();

export default {
  Mutation: {
    getSplaceByKakao: protectedResolver(async (
      _,
      { kakaoId, keyword },
      { loggedInUser }
    ) => {
      try {

        const a = await client.splace.findFirst({
          where: {
            kakaoId
          }
        });

        if (a) {
          return {
            ok: true,
            splaceId: a.id
          }
        }

        const auth = process.env.KAKAO_AUTH


        const headers = {
          "headers": {
            "Authorization": auth
          }
        }
        var places = await axios.get(encodeURI("https://dapi.kakao.com/v2/local/search/keyword.json?query=" + keyword), headers)

        if (places.statusText != 'OK') {
          return {
            ok: false,
            error: "ERROR4415"
          }
        }

        if (places.length == 0) {
          return {
            ok: false,
            error: "ERROR1412"
          }
        }

        places = places.data.documents.filter(kakao => kakao.id == kakaoId)

        if (places.length == 0) {
          return {
            ok: false,
            error: "ERROR1411"
          }
        }

        const place = places[0];

        //console.log(place)

        var address_array = place.address_name.split(" ")
        const address_2 = address_array[1].length > 2 ? address_array[1].substring(0, address_array[1].length - 1) : address_array[1]
        const address = address_array[0] + " " + address_2

        const b = await client.splace.create({
          data: {
            name: place.place_name,
            phone: place.phone,
            lat: place.y,
            lon: place.x,
            kakaoId,
            address,
            activate: true,
            intro: place.category_name
          }
        })

        const location = b.lat + ", " + b.lon
        var index_name = "splace_search"

        var document = {
          "doc": {
            "name": b.name,
            "address": b.address,
            "location": location,
            "intro": place.category_name
          }
        }

        var response = await searchEngine.create({
          id: b.id,
          index: index_name,
          body: document
        })

        //console.log(response); 

        if (response.body.result != "created") {
          return {
            ok: false,
            error: "ERROR4416"
          }
        }

        for (var i = 0; i++ ;i < 7) {
          const c = await client.timeSet.create({
            data: {
              day: i,
              splace: {
                connect: {
                  id: b.id
                }
              }
            }
          })
        }

        //console.log(a);
        return {
          ok: true,
          splaceId: b.id
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
