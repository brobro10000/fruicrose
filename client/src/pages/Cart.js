import { useSelector } from "react-redux";
import { Card, ListGroup } from "react-bootstrap";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";

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
        </div>
      ) : (
        <h1>Your cart is empty...</h1>
      )}
    </div>
  );
}

export default Cart;
