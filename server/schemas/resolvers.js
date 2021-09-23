const { User, Product, Category, Order } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({
            path: "orders",
            populate: "products"
          });
        return userData;
      }
      throw new AuthenticationError('Not logged in');
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
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if(context.user) {
        const order = new Order({products});
        await User.findByIdAndUpdate(context.user._id, {$push: {orders: order}});

        return order;
      }
      throw new AuthenticationError('Not logged in');
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
