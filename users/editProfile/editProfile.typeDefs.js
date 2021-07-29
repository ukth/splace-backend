import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstname: String
      lastname: String
      username: String
      email: String
      password: String
      profileMessage: String
    ): EditProfileResult!
  }
`;