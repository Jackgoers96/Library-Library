const { User } = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');
const { findOne } = require('../models/User');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
        const foundUser = await User.findone({_id: context.user._id})
        return foundUser;    
        }
      throw new AuthenticationError('Not Signed in!')
    }
  },
  Mutations: {
    createUser: async (parent, args, context) => {
        const user = await User.create(args)
        const token = signToken(user);
        return ({token, user});
    },
    login: async (parent, args, context) => {
        const user = await findOne(args.email);
        if (!user) {
            throw new AuthenticationError('Something went wrong!')
        }
        const correctPw = await user.isCorrectPassword(args.password);
        if (!correctPw) {
            throw new AuthenticationError('Wrong password!');
          }
          const token = signToken(user);
        return { token, user };
    },
    saveBook: async (parent, args, context) => {
        if (context.user) {
            const book = await User.findOneandUpdate(
            {_id: context.user._id},
            {$addToSet: { savedBooks: args.bookInfo}},
            { new: true }
        );
        return book;
        }
        throw new AuthenticationError('Not logged in!')
    },
    deleteBook: async (parent, args, context) => {
        if (context.user) {
            const updateUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$pull: { savedBooks: args.bookId}},
            {new: true}
            );
            return updateUser;
        }
        throw new AuthenticationError('Not Signed in!');
    }

    }
   };


module.exports = resolvers;
