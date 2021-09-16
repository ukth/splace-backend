import { gql } from "apollo-server";

export default gql`
  type getTagsResult {
    ok: Boolean!
    error: String
    specialtags: [Specialtag]
    categories: [Category]
    bigcategories: [BigCategory]
  }
  type Query {
    getTags(keyword: String, lastSpecialId: Int, lastHashId: Int): getTagsResult!
  }
`;