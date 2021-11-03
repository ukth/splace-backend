import { gql } from "apollo-server";

export default gql`
  type searchCategoriesResult {
    ok: Boolean!
    error: String
    categories: [Category]
    bigCategories: [BigCategory]
  }
  type Query {
    searchCategories(keyword: String!, lastId: Int): searchCategoriesResult!
  }
`;