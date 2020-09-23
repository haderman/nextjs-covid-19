import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const HELLO = gql`
  query {
    allCountries {
      name
      timeserie {
        date
        confirmed
        deaths
        recovered
      }
    }
  }
`;


export default function About() {
  const { loading, error, data } = useQuery(HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("data: ", data)

  return (
    <h1>Hello</h1>
  );
}
