import { gql } from "apollo-server";

export default gql`
  type getMyRoomsResult {
    ok: Boolean!
    error: String
    myRooms: [Chatroom]
    id: Int
  }
  type Query {
    getMyRooms(lastId: Int): getMyRoomsResult!
  }
`;