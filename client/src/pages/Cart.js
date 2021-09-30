import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { idbPromise } from "../utils/helpers";
import CartProduct from "../components/CartProduct";
import Loading from "../components/Loading";
import dancingFruit from "../assets/images/dancing-fruit.gif";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { Container, Image, Row, Col, Button } from "react-bootstrap";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function Cart() {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [completeCheckout, updateComplete] = useState(0);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

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
    });

    getCheckout({
      variables: { products: productIds, quantity: quantity },
    });
    console.log(getCheckout);
  }

  return (
    <Container>
      <Row>
        <div>
          {cart.length ? (
            <div>
              <div className="centerContainer">
                <h1 className="center roundedBorder">Your Cart</h1>
              </div>
              <Container>
                <Row className="checkoutContainer newBorder text-center">
                  {cart.map((product) => (
                    <CartProduct key={product._id} product={product} />
                  ))}
                  {completeCheckout === 0 ? (
                    <div>
                      <h2>Total Price: ${totalCartPrice()}</h2>
                      <Button
                        variant="success"
                        onClick={submitCheckout}
                        size="lg"
                      >
                        Checkout
                      </Button>
                    </div>
                  ) : (
                    <Loading />
                  )}
                </Row>
              </Container>
            </div>
          ) : (
            <Col xs s md lg={{ span: 6, offset: 4 }}>
              <Image
                id="dancingFruit"
                className="mt-5"
                src={dancingFruit}
                roundedCircle
                fluid
              />
              <h1 className="mt-5">Your cart is empty...</h1>
            </Col>
          )}
        </div>
      </Row>
      <div className="productContainer"></div>
    </Container>
  );
}

export default Cart;
