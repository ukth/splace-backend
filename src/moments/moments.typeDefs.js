import { gql } from "apollo-server";

export default gql`
  type Moment{
    id: Int!   
    text: String
    author: User!  
    title: String!
    videoUrl: String   
    createdAt: String! 
    updatedAt: String!
    splace: Splace  
  }
  
`;