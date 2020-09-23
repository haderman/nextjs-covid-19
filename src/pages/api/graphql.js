import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import typeDefs from "../../graphql/schema";
import resolvers from "../../graphql/resolvers";
import statsAPI from "../../graphql/datasources/stats";

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const context = {
  statsAPI,
}

const server = new ApolloServer({
  schema,
  context,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = server.createHandler({ path: "/api/graphql" });

export default handler;
