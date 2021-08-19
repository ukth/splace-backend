import { gql } from "apollo-server";

export default gql`
  type Query {
    getMyLogs(lastId: Int): [Photolog]
  }
`;