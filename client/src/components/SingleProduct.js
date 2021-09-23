function SingleProduct(product) {
    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    
        if (itemInCart) {
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: _id,
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
          });
        } else {
          dispatch({
            type: ADD_TO_CART,
            product: {...item, purchaseQuantity: 1}
          })
        }
      }
    
    return (
        <div>hello</div>
    )
}

export default SingleProduct;