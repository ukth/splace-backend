import { gql } from "apollo-server";

export default gql`
  type searchCategoriesResult {
    ok: Boolean!
    error: String
    specialtags: [Specialtag]
    categories: [Category]
    bigcategories: [BigCategory]
  }
  type Query {
    searchCategories(keyword: String, lastSpecialId: Int, lastHashId: Int): searchCategoriesResult!
  }
`;