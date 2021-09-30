import {UPDATE_PRODUCT } from "../utils/mutations";
import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
function Quantity({productIDs,quantity}) {
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    console.log(productIDs,quantity)
    useEffect(() => {
        console.log(productIDs,quantity)
        if(productIDs === 0 || quantity === 0 )
        return console.log("hi")
        else {
        return updateProduct({
            variables: {products:productIDs, stock:quantity}
        })
    }
    }, [productIDs, quantity])
 
    return (
        <>
        </>
    )
}

export default Quantity;