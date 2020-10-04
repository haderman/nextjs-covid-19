import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    allCountries: [Country]
    country(iso: String): Country
    worldTotalCases: Cases
    worldTotalNewCases: Cases
    worldTimeserie: [DailyCase]
  }

  type Country {
    iso: String
    timeserie: [DailyCase]
    totalCases: Cases
    totalCasesPerMillion: Cases
    newCases: Cases
    info: CountryInfo
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

  type CountryInfo {
    name: String
    flag: String
    population: Int
    region: String
    subregion: String
    latlng: [Float]
  }
`;

export default typeDefs;

