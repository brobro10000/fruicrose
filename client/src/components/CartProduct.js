import {
  Card,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { QUERY_ONE_PRODUCT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

function CartProduct({ product }) {
  const id = product._id;
  const { data } = useQuery(QUERY_ONE_PRODUCT, {
    variables: { productId: id },
  });
  const dispatch = useDispatch();

  if (data) {
    const queriedProduct = data.product;
    if (queriedProduct.stock <= product.purchaseQuantity) {
      product.purchaseQuantity = queriedProduct.stock;
      console.log("no more!!!");
    }
  }

  const totalItemPrice = function (product) {
    let sum = 0;
    sum += product.price * product.purchaseQuantity;
    return sum.toFixed(2);
  };

  const removeFromCart = (product) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: product._id,
    });
    idbPromise("cart", "delete", { ...product });
  };

  const quantityChange = (e) => {
    const value = e.target.value;

    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: product._id,
      });

      idbPromise("cart", "delete", { ...product });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: product._id,
        purchaseQuantity: parseInt(value),
      });

      idbPromise("cart", "put", {
        ...product,
        purchaseQuantity: parseInt(value),
      });
    }
  };

  return (
    <Card className="background-center modalObject newBorder">
      <Container>
        <Row>
          <Col md={6}>
            <Image
              className="cartImage roundedBorder"
              // className="productImage"
              src={product.imageLink}
              alt="test"
            />
          </Col>
          <Col md={5}>
            <Card.Header>
              <Card.Title>{product.name}</Card.Title>
            </Card.Header>
            <ListGroup>
              <InputGroup>
                <InputGroup.Text>Quantity:</InputGroup.Text>
                <FormControl
                  type="number"
                  placeholder="1"
                  value={product.purchaseQuantity}
                  onChange={quantityChange}
                  aria-label="Product quantity"
                />
                <InputGroup.Text>{product.unit}s</InputGroup.Text>
              </InputGroup>
              <ListGroup.Item>
                <div className="removeContainer">
                  <Card.Title>Price: ${totalItemPrice(product)}</Card.Title>
                  <Button
                    onClick={() => removeFromCart(product)}
                    variant="danger"
                    size="sm"
                  >
                    Remove From Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default CartProduct;
