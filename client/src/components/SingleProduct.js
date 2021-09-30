import { useState, useEffect, useRef } from "react";
import {
  Card,
  Image,
  Button,
  Modal,
  Row,
  Container,
  Col,
  Overlay,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CART_QUANTITY, ADD_TO_CART } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function SingleProduct(item) {
  const { _id, name, description, price, stock, unit, categories, imageLink } =
    item;
  const cart = useSelector((state) => state.cart);
  const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  const [inputValue, setInputValue] = useState(1);
  const [stockValue, setStockValue] = useState(stock);
  const [popoverDialogue, setPopover] = useState(0)
  const [popoverColor, setColor] = useState(0)
  const dispatch = useDispatch();

  const [showPop, setShowPop] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    if (itemInCart) {
      setStockValue(stockValue - itemInCart.purchaseQuantity);
    }
    // eslint-disable-next-line
  }, []);

  const addToCart = () => {
    const numValue = parseInt(inputValue);
    setStockValue(stockValue - numValue);
    setInputValue(1);

    if (isNaN(numValue) || numValue === 0) {
      console.log("sorry!");
      return;
    } else if (stockValue <= 0) {
      setStockValue(0);
      setPopover('No more items in stock!')
      setColor("rgba(255, 100, 100, 0.85)")
      setShowPop(true);
    } else if (itemInCart && itemInCart.purchaseQuantity >= stock) {
      setPopover('No more items in stock!')
      setColor("rgba(255, 100, 100, 0.85)")
      itemInCart.purchaseQuantity = stock;
      return <div>no more!!</div>;
    } else if (itemInCart) {
      setColor('rgb(25, 135, 84, 0.85)')
      setPopover('Added to Cart')
      setShowPop(true);
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + numValue,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity),
      });
    } else {
      setColor('rgb(25, 135, 84, 0.85)')
      setPopover('Added to Cart')
      setShowPop(true);
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: numValue },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: numValue });
    }
    setTimeout(() => {
      if(popoverDialogue === 'No more items in stock!')
      setShowPop(true);
      else
      setShowPop(false);
    },1500)
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className="background-center">
        <Card
          key={name}
          style={{ width: "18rem", margin: "10px" }}
          className="modalObject roundedBorder"
        >
          <Image
            className="productImage"
            alt={name}
            variant="top"
            src={imageLink}
            onClick={handleShow}
          />
          <Card.Body className="cardBackground">
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {categories[0].name}
            </Card.Subtitle>
            <Card.Text>Quantity: {stockValue}</Card.Text>
            <Card.Text>
              Price: ${price.toFixed(2)} per {unit}
            </Card.Text>
            <Container>
              <Row>
                <Col className="quantityCol" md={12}>
                  <input
                    ref={target}
                    type="number"
                    min="1"
                    max={
                      itemInCart ? stock - itemInCart.purchaseQuantity : stock
                    }
                    id={name.toLowerCase().replace(" ", "")}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <label
                    className="quantityUnit"
                    htmlFor={name.toLowerCase().replace(" ", "")}
                    value={name.toLowerCase().replace(" ", "")}
                  >
                    {unit}s
                  </label>
                </Col>
                <Col className="quantityCol" md={12}>
                  <Button variant="success" onClick={addToCart}>
                    Add to cart
                  </Button>
                </Col>
                <Col className="quantityCol" md={12}>
                  <Button variant="secondary" onClick={handleShow}>
                    Details
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose} size="lg" id="modalObject">
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
          <Modal.Title>{categories[0].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Quantity: {stockValue}</h5>
          <h5>
            Price: ${price.toFixed(2)} per {unit}
          </h5>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <input
            type="number"
            min="1"
            max={itemInCart ? stock - itemInCart.purchaseQuantity : stock}
            id={name.toLowerCase().replace(" ", "")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <span>{unit}s</span>
          <Button variant="success" onClick={addToCart}>
            Add To Cart
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Overlay target={target.current} show={showPop} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: popoverColor,
              padding: "2px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            {popoverDialogue}
          </div>
        )}
      </Overlay>
    </>
  );
}

export default SingleProduct;
