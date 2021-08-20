require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import upload from './multer';


const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
  formatError: (err) => {
    console.log(err);
  },
});

const app = express();
var helmet = require('helmet')

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/upload', upload.array('photos'), (req, res, next) => {
  console.log(req);
  res.send(req.files);
})


app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/ ✅`);
});
