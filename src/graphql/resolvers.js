const resolvers = {
  Query: {
    users(parent, args, { dataSources }) {
      return dataSources.userAPI.getAllUsers()
    }
  },
  Mutation: {
    async createUser(root, { email },  { dataSources }) {
      await dataSources.userAPI.create({ email })
      const users = await dataSources.userAPI.getAllUsers()
      return users
    },
    async login(root, { email }, { dataSources }) {
      const user = await dataSources.userAPI.find({ email });
      if (user) {
        user.token = new Buffer(email).toString('base64');
        return user;
      }
    }
  },
};

export default resolvers
