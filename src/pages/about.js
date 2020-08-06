import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks"
import ApolloClient, { gql } from "apollo-boost"

const GET_BOOK_DETAILS = gql`
  query {
    book {
      name
      author
    }
  }
`;


const SET_BOOK_DETAILS = gql`
  mutation UpdateBook($name: String!, $author: String!) {
    updateBook(name: $name, author: $author) {
      name
      author
    }
  }
`;

const GET_COLOR =gql`
  query {
    color {
      name
      hsl
    }
  }
`;

const SET_COLOR = gql`
  mutation UpdateColor($name: String!, $hsl: String!) {
    updateColor(name: $name, hsl: $hsl) {
      name
      hsl
    }
  }
`;

export default function About() {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql-data",
  });

  return (
    <ApolloProvider client={client}>
      <h2>HOLA ABOUT</h2>
      <Book />
    </ApolloProvider>
  )
}

function Book() {
  const { loading, error, data } = useQuery(GET_COLOR)

  const updateCache = (cache, { data: { updateColor } }) => {
    const existingColor = cache.readQuery({
      query: GET_COLOR,
    });

    cache.writeQuery({
      query: GET_COLOR,
      data: { color: updateColor },
    });
  };

  const [updateColor] = useMutation(SET_COLOR, { update: updateCache })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const updateColorDetails = () => {
    updateColor({
      variables: { name: "red", hsl: "(0, 60, 50)" },
    })
  }

  return (
    <div>
      <p>
        {data.color.name} - {data.color.hsl}
      </p>
      <button onClick={updateColorDetails}>Update Book</button>
    </div>
  )
}
