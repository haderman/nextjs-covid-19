import { DataSource } from "apollo-datasource"

export default class UserAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async findOrCreateUser({ email: emailArg }) {
    console.log("findOrCreateUser: ", email)
    return null
    const email = this.context?.user?.email ?? emailArg

    if (!email) return null
  }

  async create({ email }) {
    await this.store.User.query().insert({ email: email + "@example.com", name: email })
    return this.store.User.query()
  }

  async find({ email: emailArg }) {
    const email = this.context?.user?.email ?? emailArg

    if (!email) return null

    const user = await this.store.User.query().findOne({ email })
    console.log("USER: ", user)
    return user
  }

  async getAllUsers() {
    return this.store.User.query()
  }
}
