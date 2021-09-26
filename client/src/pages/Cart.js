import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import CartProduct from "../components/CartProduct";
import Loading from "../components/Loading";
import dancingFruit from "../assets/images/dancing-fruit.gif";
import { Container, Image, Row, Col } from "react-bootstrap";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Cart() {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [completeCheckout, updateComplete] = useState(0);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const totalCartPrice = function () {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  };

  function submitCheckout() {
    updateComplete(1);
    const productIds = [];
    const quantity = [];
    console.log(cart);
    cart.forEach((item) => {
      // for (let i = 0; i < item.purchaseQuantity; i++) {
      productIds.push(item._id);
      quantity.push(item.purchaseQuantity);
      // }
      console.log(productIds);
    });

    getCheckout({
      variables: { products: productIds, quantity: quantity },
    });
  }

  return (
    <Container>
      <Row>
        <div>
          {cart.length ? (
            <div>
              <h1>Your Cart</h1>
              {cart.map((product) => (
                <CartProduct key={product._id} product={product} />
              ))}
              <h2>Total Price: ${totalCartPrice()}</h2>
              {completeCheckout === 0 ? (
                <button onClick={submitCheckout}>Checkout</button>
              ) : (
                <Loading />
              )}
            </div>
          ) : (
            <Col xs s md lg={{ span: 6, offset: 4 }}>
              <Image className="mt-5" src={dancingFruit} roundedCircle fluid />
              <h1 className="mt-5">Your cart is empty...</h1>
            </Col>
          )}
        </div>
      </Row>
    </Container>
  );
}

export default Cart;
