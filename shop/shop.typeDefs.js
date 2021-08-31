import { gql } from "apollo-server";

export default gql`
  type PaymentLog {
    paymentLogId: Int!
    customerId: Int!
    merchantUId: String!
    credit: Int!
    creditGiven: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type BuyLog {
    buyLogId: Int!
    itemId: Int!
    shopId: Int!
    credit: Int!
    createdAt: String!
    updatedAt: String!  
  }
`;