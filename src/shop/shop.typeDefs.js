import { gql } from "apollo-server";

export default gql`
  type PaymentLog {
    id: Int!
    customerId: Int!
    merchantUId: String!
    credit: Int!
    creditGiven: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type BuyLog {
    id: Int!
    itemId: Int!
    shopId: Int!
    credit: Int!
    createdAt: String!
    updatedAt: String!  
  }
`;