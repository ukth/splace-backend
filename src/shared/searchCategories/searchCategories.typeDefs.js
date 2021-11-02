import { gql } from "apollo-server";

export default gql`
  type searchCategoriesResult {
    ok: Boolean!
    error: String
    categories: [Category]
    bigcategories: [BigCategory]
  }
  type Mutation {
    searchCategories(keyword: String!, lastHashId: Int): searchCategoriesResult!
  }
`;