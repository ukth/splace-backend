import { gql } from "apollo-server";

export default gql`
  type getRafflesResult {
    ok: Boolean!
    error: String
    raffles: [Raffle]
  }
  type Query {
    getRaffles(lastId: Int): getRafflesResult!
  }
`;