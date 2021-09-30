import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ORDER, UPDATE_PRODUCT } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import Loading from "../components/Loading";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const updateProduct = [];
      console.log(cart);
      const products = cart.map((item) => item._id);

      const productIds = [];
      const quantity = [];
      cart.forEach((item) => {
        productIds.push(item._id);
        quantity.push(item.purchaseQuantity);
      });

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        // await updateProduct({
        //   variables: { products: productIds, stock: quantity },
        // });

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
        return console.log(products[0].purchaseQuantity);
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    console.log(addOrder);
    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to the home page</h2>
      <Loading />
    </div>
  );
}

export default Success;
