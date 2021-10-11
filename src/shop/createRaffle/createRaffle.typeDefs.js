import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createRaffle(
      name: String!
      credit: Int!
      dDay: String!
      imageUrls: [String]
      splaceId: Int
      info: String
    ): defaultResult!
  }
`;