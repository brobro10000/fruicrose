import { useSelector, useDispatch } from "react-redux";

function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    function totalPrice() {
        let sum = 0;
        cart.forEach((item) => {
            sum += item.price * item.purchaceQuantity;
        });
        return sum.toFixed(2);
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <ul>
                
            </ul>
        </div>
    )
}

export default Cart;