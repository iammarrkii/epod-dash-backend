const userInfoResolver = {
  Query: {
    userInfo: async (parent, args, { userInfo }, info) => {
      const user = await userInfo()
      return user.data.userInfo
    },
  },
}

export default userInfoResolver
