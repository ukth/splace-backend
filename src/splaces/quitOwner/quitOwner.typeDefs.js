import { gql } from "apollo-server";

export default gql`
  type Mutation {
    quitOwner (
      splaceId: Int!
    ): defaultResult!
  }
`;