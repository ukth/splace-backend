import { gql } from "apollo-server";

export default gql`
  type getPaymentLogsResult {
    ok: Boolean!
    error: String
    logs: [PaymentLog]
  }
  type Query {
    getPaymentLogs(lastId: Int): getPaymentLogsResult!
  }
`;