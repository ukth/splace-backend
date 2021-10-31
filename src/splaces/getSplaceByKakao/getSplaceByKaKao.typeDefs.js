import { gql } from "apollo-server";

export default gql`
  type getSplaceByKakaoResult {
    ok: Boolean!
    error: String
    splace: Splace
  }
  type Mutation {
    getSplaceByKakao(
      kakaoId: Int!
      keyword: String!
    ): getSplaceByKakaoResult!
  }
`;