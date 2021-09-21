const faker = require("faker");

const db = require("../config/connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  console.log('hi')

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Apples and Pears' },
    { name: 'Citrus' },
    { name: 'Tropical and Exotic' },
    { name: 'Berries' },
    { name: 'Melons' },
    { name: 'Stone Fruit' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Fuji apple',
      price: 1.15,
      stock: 56,
      category: categories[0]._id
    },
    {
      name: 'Honeycrisp apple',
      price: 1.20,
      stock: 43,
      category: categories[0]._id
    },
    {
      name: 'Tangerine',
      price: 0.99,
      stock: 75,
      category: categories[1]._id
    },
    {
      name: 'Raspberry',
      price: 0.05,
      stock: 576,
      category: categories[3]._id
    },
    {
      name: 'Lemon',
      price: 1,
      stock: 84,
      category: categories[1]._id
    },
    {
      name: 'Watermelon',
      price: 4.09,
      stock: 32,
      category: categories[4]._id
    },
    {
      name: 'Blueberry',
      price: 0.03,
      stock: 1285,
      category: categories[3]._id
    },
    {
      name: 'Peach',
      price: 1.99,
      stock: 48,
      category: categories[5]._id
    },
    {
      name: 'Mango',
      price: 2.10,
      stock: 69,
      category: categories[2]._id
    },
    {
      name: 'Banana',
      price: 0.55,
      stock: 254,
      category: categories[2]._id
    }
  ]);

  console.log('products seeded');


  await User.deleteMany();

  await User.create({
    username: 'testuser',
    email: 'test@gmail.com',
    password: 'testpass'
  })

  console.log('user seeded');

  console.log("all done!");
  process.exit(0);
});
