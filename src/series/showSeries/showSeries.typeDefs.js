import { gql } from "apollo-server";

export default gql`
  type Mutation {
    showSeries(targetId: Int!): defaultResult!
  }
`;