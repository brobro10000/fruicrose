import { useSelector, useDispatch } from "react-redux";

function Cart() {
    const cart = useSelector((state) => state.cart);
    
    const totalPrice = function(item) {
        let sum = 0;
            sum += item.price * item.purchaseQuantity;
        return sum.toFixed(2);
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cart.length ? (
            <div>
            {cart.map((product) => (
                <>
                <h3>{product.name}</h3>
                <h4>{product.purchaseQuantity} {product.unit}s</h4>
                <h4>Total price: ${totalPrice(product)}</h4>
                </>
            ))}
            </div>
            ): (
                <h1>Your cart is empty...</h1>
            )}
        </div>
    )
}

export default Cart;