require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import uploadPhoto from './multerPhoto';
import uploadVideo from './multerVideo';
import http from "http";
import axios from "axios";
import depthLimit from 'graphql-depth-limit'



const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      }
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("please login to listen.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
  formatError: (err) => {
    console.log(err);
  },
  validationRules: [depthLimit(8)]
});

const app = express();
var helmet = require('helmet')

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/uploadphoto', uploadPhoto.array('photos', 16), (req, res, next) => {
  console.log(req);
  res.send(req.files);
})

app.post('/uploadvideo', uploadVideo.single('video'), (req, res, next) => {
  console.log(req);
  res.send(req.file);
})

app.use('/healthcheck', require('express-healthcheck')());

app.get('/geocode', async (req, res) => {
  try {
    const ID = process.env.NCP_API_ID
    const KEY = process.env.NCP_API_KEY
    const headers = {
      "headers": {
        "X-NCP-APIGW-API-KEY-ID": ID,
        "X-NCP-APIGW-API-KEY": KEY,
      }
    }
    //console.log(req)
    const keyword = req.query.keyword
    const coordinate = req.query.coordinate
    const url = coordinate != null ? "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + keyword + "&coordinate=" + coordinate : "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + keyword
    //console.log(keyword)
    const geocode = await axios.get(encodeURI(url), headers)
    //console.log(geocode.data)
    res.send(geocode.data)
  } catch (e) {
    console.log(e)
    return null;
  }
})

app.get('/reversegeocode', async (req, res) => {
  try {
    const ID = process.env.NCP_API_ID
    const KEY = process.env.NCP_API_KEY
    const headers = {
      "headers": {
        "X-NCP-APIGW-API-KEY-ID": ID,
        "X-NCP-APIGW-API-KEY": KEY,
      }
    }
    const lat = req.query.lat
    const lon = req.query.lon
    //console.log(lat, lon);
    const reverseGeocode = await axios.get(encodeURI("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?orders=roadaddr,addr,legalcode&output=json&coords=" + lon + "," + lat), headers);
    //console.log(reverseGeocode.data)
    res.send(reverseGeocode.data)
  } catch (e) {
    console.log(e)
    return null;
  }
})

app.get('/keyword', async (req, res) => {
  try {
    const auth = process.env.KAKAO_AUTH
    const keyword = req.query.keyword
    const x = req.query.x
    const y = req.query.y

    const headers = {
      "headers": {
        "Authorization": auth
      }
    }
    var url = (x != null && y != null) ? "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + keyword + "&x=" + x + "&y=" + y: "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + keyword
    var places = await axios.get(encodeURI(url), headers)
    //console.log(reverseGeocode.data)
    res.send(places.data)
  } catch (e) {
    console.log(e)
    return null;
  }
})


app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});