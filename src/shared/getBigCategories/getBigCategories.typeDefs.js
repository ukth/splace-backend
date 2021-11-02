import { gql } from "apollo-server";

export default gql`
  type getBigCategoriesResult {
    ok: Boolean!
    error: String
    bigCategories: [BigCategory]
  }
  type Query {
    getBigCategories: getBigCategoriesResult!
  }
`;