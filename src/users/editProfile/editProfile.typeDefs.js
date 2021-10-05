import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      name: String
      username: String
      email: String
      password: String
      profileMessage: String
      profileImageUrl: String
      url: String
    ): defaultResult!
  }
`;