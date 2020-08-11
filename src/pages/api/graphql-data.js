import { ApolloServer } from "apollo-server-micro";
import knex from "knex"
import { Model } from "objection"
import typeDefs from "graphql/schema"
import resolvers from "graphql/resolvers"
import { createStore } from "graphql/utils"
import UserAPI from "graphql/datasources/user"

const store = createStore()

function dataSources() {
  return {
    userAPI: new UserAPI({ store })
  }
}

async function context({ req }) {
  // const cookie = req?.headers?.cookie
  const auth = req?.headers?.authorization ?? ""
  const email = new Buffer(auth, 'base64').toString('ascii')
  const user = store.User.query().findOne({ email })
  return { user }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

const handler = server.createHandler({ path: "/api/graphql-data" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;


// MOVE TO UTILS

const db = knex({
  client: "pg",
  connection: {
    host: "ec2-50-19-26-235.compute-1.amazonaws.com",
    user: "axbgalezzcygsj",
    password: "2aaa75274d5d2318e65f02bfc01e84b65eec91992719467fb0aa83258ca8df4b",
    database: "d8ipdvhbgrk6b2",
    port: 5432,
    ssl: {
      rejectUnauthorized: false // https://stackoverflow.com/a/62965481
    },
  },
  pool: { min: 0, max: 2 }
});

Model.knex(db)

class User extends Model {
  static get tableName() {
    return "users"
  }
}

async function createUserSchema() {
  if (await db.schema.hasTable("users")) {
    return
  }

  await db.schema.createTable("users", table => {
    table.increments("id").primary()
    table.string("name")
  })
}

async function mainUsers() {
  const firstUser = await User.query().insert({ name: "Ronaldinho" })
}

// createUserSchema()
//   .then(() => db.destroy())
//   .catch(err => {
//     console.error("err creating user schema: ", err);
//     return db.destroy();
//   })

class Person extends Model {
  static get tableName() {
    return "persons"
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: "persons.id",
          to: "persons.parentId"
        }
      }
    }
  }
}

async function createSchema() {
  if (await db.schema.hasTable("persons")) {
    return
  }

  // Create database schema. You should use knex migrations files
  // to do this. We created it here for simplicity
  await db.schema.createTable("persons", table => {
    table.increments("id").primary()
    table.integer("parentId").references("persons.id")
    table.string("firstName")
  })
}

async function main() {
  // create some people
  // const sylvester = await Person.query().insertGraph({
  //   firstName: "Sylvester",
  //   children: [{
  //     firstName: "Sage"
  //   }, {
  //     firstName: "Sophia"
  //   }]
  // })

  // console.log("created: ", sylvester)

  // Fetch all people named Sylvester and sort them by id.
  // Load `children` relation eagerly.
  const sylvesters = await Person.query()
    .where("firstName", "Sylvester")
    .withGraphFetched("children")
    .orderBy("id")

  console.log("sylvesters: ", sylvesters)
}

// createSchema()
//   .then(() => main())
//   .then(() => db.destroy())
//   .catch(err => {
//     console.error(err);
//     return db.destroy();
//   })



