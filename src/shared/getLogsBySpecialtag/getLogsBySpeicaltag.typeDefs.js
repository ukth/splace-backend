import { gql } from "apollo-server";

export default gql`
  type getLogsBySpecialtagResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getLogsBySpecialtag(tagId: Int!, lastId: Int): getLogsBySpecialtagResult!
  }
`;