import { gql } from "apollo-server";

export default gql`
  type Mutation {
    reportResources(sourceType: String!, sourceId: Int, reason: String): defaultResult!
  }
`;