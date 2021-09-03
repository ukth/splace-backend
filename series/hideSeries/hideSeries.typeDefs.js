import { gql } from "apollo-server";

export default gql`
  type Mutation {
    hideSeries(targetId: Int!): defaultResult!
  }
`;