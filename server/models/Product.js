const { Schema, model, Types } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    imageLink: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

productSchema.virtual("categoryCount").get(function () {
  return this.categories.length;
});

const Product = model("Product", productSchema);

module.exports = Product;
