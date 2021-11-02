import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logSeePhotolog(photologId: Int): defaultResult!
  }
`;