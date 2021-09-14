// const { Schema, model, Types } = require("mongoose");

// const productSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     stock: {
//       type: Number,
//       required: true,
//     },
//     categories: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Category",
//       },
//     ],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// productSchema.virtual("categoryCount").get(function () {
//   return this.categories.length;
// });

// const Product = model("Product", productSchema);

// module.exports = Product;
