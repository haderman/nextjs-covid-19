import { ApolloServer, gql } from "apollo-server-micro";

const book = {
  name: "The Hungarian Sausage",
  author: "Ben Grunfeld",
};

const color = {
  name: "Blue",
  hsl: "(200, 60, 50)",
}

const typeDefs = gql`
  type Book {
    name: String
    author: String
  }
  type Color {
    name: String
    hsl: String
  }
  type Query {
    book: Book
    color: Color
  }
  type Mutation {
    updateBook(name: String!, author: String!): Book
    updateColor(name: String!, hsl: String!): Color
  }
`;

const resolvers = {
  Query: {
    book: () => book,
    color: () => color,
  },

  Mutation: {
    updateBook: (root, args) => {
      return {
        name: args.name,
        author: new Date().toISOString()
      };
    },
    updateColor: (root, args) => {
      return {
        name: args.name,
        hsl: args.hsl,
      }
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = server.createHandler({ path: "/api/graphql-data" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
