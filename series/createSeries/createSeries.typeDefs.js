import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createSeries(
      title: String!
    ): defaultResult!
  }
`;