import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unscrapLog(
      scrapedLogId: Int!
    ): defaultResult!
  }
`;