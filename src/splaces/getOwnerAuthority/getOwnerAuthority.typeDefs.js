import { gql } from "apollo-server";

export default gql`
  type Mutation {
    getOwnerAuthority (
      birtyDay: String!
      splaceId: Int!
      corpNum: String!
      name: String!
      imageUrls: [String]
    ): defaultResult!
  }
`;