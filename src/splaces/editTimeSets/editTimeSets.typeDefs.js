import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editTimeSets(
      splaceId: Int!
      breakDays: [Int]!
      mon: [Int]!
      tue: [Int]!
      wed: [Int]!
      thr: [Int]!
      fri: [Int]!
      sat: [Int]!
      sun: [Int]!
      holidayBreak: Boolean!
    ): defaultResult!
  }
`;