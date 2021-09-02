import { gql } from "apollo-server";

export default gql`
  type getMyRoomsResult {
    ok: Boolean!
    error: String
    rooms: [Chatroom]
  }
  type Query {
    getMyRooms: getMyRoomsResult!
  }
`;