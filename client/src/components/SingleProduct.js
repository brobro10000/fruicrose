import { useState, useEffect } from "react";
import { Card, Image, Button, Modal, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function SingleProduct(item) {
  const { _id, name, description, price, stock, unit, categories, imageLink, count } = item;
  const cart = useSelector((state) => state.cart);
  const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  const [inputValue, setInputValue] = useState(1);
  const [stockValue, setStockValue] = useState(stock)
  const dispatch = useDispatch();

  const randomColor = function() {
    const colorArray = ['green', 'yellow', 'orange', 'red', 'purple'];
    const randomValue = colorArray[Math.floor(colorArray.length * Math.random())];
    return randomValue;
  }
  
  var classItem = `background backgroundMod${count}`


  useEffect(() => {
    if (itemInCart) {
       setStockValue(stockValue - itemInCart.purchaseQuantity)
    }
  }, [])

  const addToCart = () => {
    const numValue = parseInt(inputValue);
    setStockValue(stockValue - numValue);
    setInputValue(1)

    if (isNaN(numValue) || numValue === 0) {
      console.log('sorry!')
      return;
    } else if (itemInCart && itemInCart.purchaseQuantity >= stock) {
      itemInCart.purchaseQuantity = stock;
      return <div>no more!!</div>;
    } else if (itemInCart) {
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
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: numValue },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: numValue });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <>
    <Container id={name.toLowerCase().replace(" ", "")+count} className={classItem} >
    <Card key={name} style={{ width: "18rem", margin: "10px" }}>
      <Image className="productImage" alt={name} variant="top" src={imageLink} onClick={handleShow}/>
      <Card.Body className={randomColor()}>
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
        <Button onClick={addToCart}>Add to cart</Button>
        <input type="number"
         min="1"
         max={itemInCart ? stock - itemInCart.purchaseQuantity : stock}
         id={name.toLowerCase().replace(" ", "")}
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
         />
        <Button variant="secondary" onClick={handleShow}>Details</Button>
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
          <h5>Price: ${price.toFixed(2)} per {unit}</h5>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addToCart}>Add To Cart</Button>
          <input type="number"
          min="1"
          max={itemInCart ? stock - itemInCart.purchaseQuantity : stock}
          id={name.toLowerCase().replace(" ", "")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SingleProduct;
