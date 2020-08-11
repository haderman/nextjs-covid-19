import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks"
import ApolloClient, { gql } from "apollo-boost"


const GET_USER = gql`
  query {
    users {
      id
      name
      email
    }
  }
`

const SET_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(email: $email) {
      id
      name
      email
    }
  }
`

const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`

export default function About() {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql-data",
    headers: {
      authorization: "", // localStorage.getItem('token') || "",
    }
  });

  return (
    <ApolloProvider client={client}>
      <h2>HOLA ABOUT</h2>
      <Book />
    </ApolloProvider>
  )
}

function Book() {
  const { loading, error, data } = useQuery(GET_USER)

  const updateCache = (cache, { data: { createUser } }) => {
    const existingUser = cache.readQuery({
      query: GET_USER,
    });
    console.log("updateCache: ", createUser)
    cache.writeQuery({
      query: GET_USER,
      data: { users: createUser },
    });
  };

  const [createUser] = useMutation(SET_USER, { update: updateCache })
  const [login] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token)
      console.log("onCompleted: ", login)
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      createUser({
        variables: {
          email: e.target.value
        }
      })
    }
  }

  const handleOnClick = () => {
    login({
      variables: {
        email: "maradona@example.com"
      }
    })
  }

  console.log("data: ", data)

  return (
    <div className="text-primary">
      <ul>
        {data.users.map(user =>
          <li key={user.id}>{user.id}: {user.name}</li>
        )}
      </ul>
      <input
        autoFocus
        type="text"
        className="text-primary border-s border-color-strong"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleOnClick}>
        Login
      </button>
    </div>
  )
}
