import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { Card, ListGroup } from "react-bootstrap";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(pk_test_TYooMQauvdEDq54NiTphI7jx);

function Cart() {
  const cart = useSelector((state) => state.cart);

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

    // state.cart.forEach((item) => {
    //   for (let i = 0; i < item.purchaseQuantity; i++) {
    //     productIds.push(item._id);
    //   }
    // });
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length ? (
        <div>
          {cart.map((product) => (
            <Card>
              <Card.Header>
                <Card.Title>{product.name}</Card.Title>
              </Card.Header>
              <ListGroup>
                <ListGroup.Item>
                  {product.purchaseQuantity} {product.unit}s
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${totalItemPrice(product)}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          ))}
          <h2>Total Price: ${totalCartPrice()}</h2>
          <button onClick={submitCheckout}>Checkout</button>
        </div>
      ) : (
        <h1>Your cart is empty...</h1>
      )}
    </div>
  );
}

export default Cart;
