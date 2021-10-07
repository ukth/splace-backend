const { Client } = require('@elastic/elasticsearch')
require("dotenv").config();


const endpoint = "https://" + process.env.ES_DOMAIN
const searchEngine = new Client({ node: endpoint })


export default searchEngine;