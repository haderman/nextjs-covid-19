import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
    allCountries: [Country]
    country(name: String): Country
    worldTotalCases: Cases
    worldTotalNewCases: Cases
  }

  type Country {
    name: String
    timeserie: [DailyCase]
    totalCases: Cases
    newCases: Cases
  }

  type DailyCase {
    date: String
    cases: Cases
  }

  type Cases {
    confirmed: Int
    deaths: Int
    recovered: Int
    actives: Int
  }
`;

export default typeDefs;

