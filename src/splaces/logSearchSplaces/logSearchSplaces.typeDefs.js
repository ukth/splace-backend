import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logSearchSplaces(
      keyword: String!, 
    ): defaultResult!
  }
`;