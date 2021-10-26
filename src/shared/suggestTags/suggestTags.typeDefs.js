import { gql } from "apollo-server";

export default gql`
  type suggestTagsResult {
    ok: Boolean!
    error: String
    ratingtags: [Ratingtag]
    bigCategories: [BigCategory]
  }
  type Query {
    suggestTags: suggestTagsResult!
  }
`;