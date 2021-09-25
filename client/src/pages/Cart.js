import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { Card, ListGroup } from "react-bootstrap";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import CartProduct from '../components/CartProduct';

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Cart() {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const totalItemPrice = function (item) {
    let sum = 0;
    sum += item.price * item.purchaseQuantity;
    return sum.toFixed(2);
  };

  const totalCartPrice = function () {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  };

  function submitCheckout() {
    const productIds = [];

    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length ? (
        <div>
            <h1>Your Cart</h1>
            {cart.length ? (
            <div>
            {cart.map((product) => (
                <CartProduct key={product._id} product={product}/>
            ))}
            <h2>Total Price: ${totalCartPrice()}</h2>
            <button onClick={submitCheckout}>Checkout</button>
            </div>
            ): (
                <h1>Your cart is empty...</h1>
         </div>
            )}
    </div>
  );
}


export default Cart;
