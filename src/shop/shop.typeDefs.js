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
  type BuyRaffleLog {
    id: Int!
    raffle: Raffle!
    raffleId: Int!
    customer: User!
    customerId: Int!
    credit: Int!
    createdAt: String!
    updatedAt: String!  
  }
  type Raffle {
    id: Int!
  
    name: String!
    dDay: String!
    imageUrls: [String]
  
    credit: Int!
  
    splace: Splace
    splaceId: Int
  
    info: String
  
    buyLog: [BuyRaffleLog]
  }
  type CreditGivenLog {
    id: Int!
    userId: Int!
    credit: Int!
    code: String   
    createdAt: String!
    updatedAt: String!
  }
`;