import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteMoments(
      momentsId: Int!
    ): defaultResult!
  }
`;