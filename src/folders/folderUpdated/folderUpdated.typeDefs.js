import { gql } from "apollo-server";

export default gql`
  type folderUpdatedResult {
    user: User
    folder: Folder
    state: String
  }
  type Subscription {
    folderUpdated: folderUpdatedResult
  }
`;