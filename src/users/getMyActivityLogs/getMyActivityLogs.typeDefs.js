import { gql } from "apollo-server";

export default gql`
  type getMyActivityLogsResult{
    ok: Boolean!
    error: String
    followLogs: [FollowLog]
    editFolderLogs: [EditFolderLog]
    likeLogs: [LikeLog]
  }
  type Query {
    getMyActivityLogs: getMyActivityLogsResult
  }
`;