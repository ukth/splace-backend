import { gql } from "apollo-server";

export default gql`
  type Mutation {
    scrapLog(
      photologId: Int!
    ): defaultResult!
  }
`;