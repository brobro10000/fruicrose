import { Card, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { useDispatch } from "react-redux";

function CartProduct({product}) {
    const dispatch = useDispatch();

    const totalItemPrice = function(product) {
        let sum = 0;
            sum += product.price * product.purchaseQuantity;
        return sum.toFixed(2);
    }

    const removeFromCart = product => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: product._id
          });
    };

    const quantityChange = (e) => {
        const value = e.target.value;

        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: product._id
            });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: product._id,
                purchaseQuantity: parseInt(value)
            });
        }
    };

    return (
        <Card>
            <Card.Header><Card.Title>{product.name}</Card.Title></Card.Header>
            <ListGroup>
                <InputGroup>
                    <InputGroup.Text>Quantity:</InputGroup.Text>
                    <FormControl 
                    type="number"
                    placeholder="1"
                    value={product.purchaseQuantity}
                    onChange={quantityChange}
                    aria-label="Product quantity"/>
                    <InputGroup.Text>{product.unit}s</InputGroup.Text>
                </InputGroup>
                <ListGroup.Item>Price: ${totalItemPrice(product)}</ListGroup.Item>
                <ListGroup.Item><Button onClick={() => removeFromCart(product)}>Remove From Cart</Button></ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default CartProduct;