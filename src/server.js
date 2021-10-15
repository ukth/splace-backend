require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import upload from './multer';
import http from "http";
import axios from "axios";



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
});

const app = express();
var helmet = require('helmet')

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/upload', upload.array('photos'), (req, res, next) => {
  console.log(req);
  res.send(req.files);
})

app.get('/geocode', async (req, res) => {
  try {
    const auth = process.env.KAKAO_AUTH
    const headers = {
      "headers": {
        "Authorization": auth
      }
    }
    //console.log(req)
    const keyword = req.query.keyword
    //console.log(keyword)
    const geocode = await axios.get(encodeURI("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + keyword), headers)
    //console.log(geocode.data)
    res.send(geocode.data)
  } catch (e) {
    console.log(e)
    return null;
  }
})

app.get('/reversegeocode', async (req, res) => {
  try {
    const auth = process.env.KAKAO_AUTH
    const headers = {
      "headers": {
        "Authorization": auth
      }
    }
    const lat = req.query.lat
    const lon = req.query.lon
    //console.log(lat, lon);
    const reverseGeocode = await axios.get(encodeURI("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?orders=roadaddr&output=json&coords=" + lon + "," + lat), headers);
    //console.log(reverseGeocode.data)
    res.send(reverseGeocode.data)
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
  console.log(`🚀Server is running on http://localhost:${PORT}/ ✅`);
});
