import { useSelector } from "react-redux";
import CartProduct from '../components/CartProduct';

function Cart() {
    const cart = useSelector((state) => state.cart);

    const totalCartPrice = function() {
        let sum = 0;
        cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length ? (
            <div>
            {cart.map((product) => (
                <CartProduct key={product._id} product={product}/>
            ))}
            <h2>Total Price: ${totalCartPrice()}</h2>
            </div>
            ): (
                <h1>Your cart is empty...</h1>
            )}
        </div>
    )
}

export default Cart;