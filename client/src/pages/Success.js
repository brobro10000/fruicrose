import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import Loading from "../components/Loading";
import Quantity from "../components/Quantity";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  const [productIDs, populateA] = useState(0)
  const [quantity, populateB] = useState(0)
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);

      const productIds = [];
      const quantity = [];
      cart.forEach((item) => {
        productIds.push(item._id);
        quantity.push(item.purchaseQuantity);
      });
      console.log(productIds,quantity)
      populateA(productIds)
      populateB(quantity)
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        return productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    console.log(addOrder);
    saveOrder();
  }, [addOrder]);

  return (
    <div className="centerContainer">
    <div className="success newBorder">
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
      <Quantity
      productIDs={productIDs}
      quantity={quantity}
        />
      <Loading />
    </div>
    </div>
  );
}

export default Success;
