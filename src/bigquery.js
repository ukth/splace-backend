const { BigQuery } = require("@google-cloud/bigquery");
require("dotenv").config();
const keyjson = require("../gcp.credentials.json")

const bigquery = new BigQuery({
    "projectId": process.env.GCP_PROJECT_ID,
    "keyFile": keyjson
});
const dataset = bigquery.dataset(process.env.GCP_DATASET_ID)

export default dataset