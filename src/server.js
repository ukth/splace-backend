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

app.get('/geocode',(req,res) => {
  const ID = process.env.NCP_API_ID
  const KEY = process.env.NCP_API_KEY
  const headers = {
    "headers": {
      "X-NCP-APIGW-API-KEY-ID" : ID,
      "X-NCP-APIGW-API-KEY" : KEY,
    }
  }
  const keyword = req.params.keyword
  const geocode = await axios.get("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query="+keyword, headers) 
  console.log(geocode)
  res.send(geocode)
})

app.get('/reversegeocode',(req,res) => {
  const ID = process.env.NCP_API_ID
  const KEY = process.env.NCP_API_KEY
  const headers = {
    "headers": {
      "X-NCP-APIGW-API-KEY-ID" : ID,
      "X-NCP-APIGW-API-KEY" : KEY,
    }
  }
  const lat = req.params.lat
  const lon = req.params.lon
  const reverseGeocode = await axios.get("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?orders=roadaddr&output=json&coords="+lon+","+lat,headers);
  console.log(reverseGeocode)
  res.send(reverseGeocode)
})


app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/ ✅`);
});
