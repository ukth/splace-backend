import { gql } from "apollo-server";

export default gql`
  type seePhotologResult {
    ok: Boolean!
    error: String
    log: Photolog
  }  
  type Mutation {
    seePhotolog(photologId: Int): seePhotologResult!
  }
`;