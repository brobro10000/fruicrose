const db = require('./connection');
const faker = require("faker");

const { User, Product, Category } = require('../models');
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

db.once('open', async () => {
  await Product.deleteMany();

  const product = await Product.insertMany([
    {
        "name": "Apple",
        "price": `${getRandom(1,5)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Apricot",
        "price": `${getRandom(1,5)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Banana",
        "price": `${getRandom(0,1)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Blueberry",
        "price": `${getRandom(0,1)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Cherry",
        "price": `${getRandom(0,1)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Durian",
        "price": `${getRandom(5,10)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Grapes",
        "price": `${getRandom(0,1)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Guava",
        "price": `${getRandom(5,10)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Lemon",
        "price": `${getRandom(1,3)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Lime",
        "price": `${getRandom(1,3)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Mango",
        "price": `${getRandom(2,5)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Melon",
        "price": `${getRandom(5,10)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Orange",
        "price": `${getRandom(0,3)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Papaya",
        "price": `${getRandom(5,10)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Pear",
        "price": `${getRandom(1,5)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Persimmon",
        "price": `${getRandom(5,10)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Pineapple",
        "price":`${getRandom(5,10)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Raspberry",
        "price": `${getRandom(0,1)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Strawberry",
        "price": `${getRandom(0,1)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Tomato",
        "price": `${getRandom(2,5)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    },
    {
        "name": "Watermelon",
        "price": `${getRandom(5,10)}.${getRandom(0,9)}${getRandom(0,9)}`,
        "stock": getRandom(5,125),
        "categories": []
    }
])

  process.exit();
});
