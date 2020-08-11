import knex from "knex"
import { Model } from "objection"

export function createStore() {
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

  return { db, User }
}
