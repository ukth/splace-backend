require("dotenv").config();

var { Client } = require('@opensearch-project/opensearch');

var host = process.env.ES_DOMAIN;
var protocol = 'https';

var searchEngine = new Client({
    node: protocol + '://' + host,
})

export default searchEngine;