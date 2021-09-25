
import { Card, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCTS ,UPDATE_CART_QUANTITY, ADD_TO_CART } from "../utils/actions";

function SingleProduct(item) {
  const { _id, name, price, stock, unit, categories, imageLink } = item;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    if (itemInCart && itemInCart.purchaseQuantity >= stock) {
      itemInCart.purchaseQuantity = stock;
      return (
        <div>no more!!</div>
      )
    } else if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
    }
  };

  return (
    <Card key={name} style={{ width: "18rem", margin: "10px" }}>
      <Image alt={name} variant="top" src={imageLink} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {categories[0].name}
        </Card.Subtitle>
        <Card.Text>Quantity: {stock}</Card.Text>
        <Card.Text>
          Price: ${price.toFixed(2)} per {unit}
        </Card.Text>
        <Button onClick={addToCart}>Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default SingleProduct;
