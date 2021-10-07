import { gql } from "apollo-server";

export default gql`
  type getMyScrapResult{
    ok: Boolean!
    error: String
    logs: [Photolog]
    series: [Series]
  }
  type Query {
    getMyScrap: getMyScrapResult
  }
`;