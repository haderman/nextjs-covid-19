import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import typeDefs from "../../graphql/schema";
import resolvers from "../../graphql/resolvers";

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = server.createHandler({ path: "/api/graphql" });

export default handler;
