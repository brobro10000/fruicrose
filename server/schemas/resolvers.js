const { User, Product, Category } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("orders");
        return userData;
      }
    },
    products: async (parent, args) => {
      const allProducts = await Product.find().populate('categories');
      return allProducts;
    },
    product: async (parent, { _id }) => {
      const singleProduct = await Product.findById(_id).populate('categories');
      return singleProduct;
    },
    categories: async () => {
      const allCategories = await Category.find();
      return allCategories;
    },
    category: async (parent, { _id }) => {
      const singleCategory = await Category.findById(_id);
      return singleCategory;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
