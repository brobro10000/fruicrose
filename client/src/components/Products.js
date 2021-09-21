import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { Container } from 'react-bootstrap';

function Products() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, loading, dispatch]);

  console.log(products);
  if (!products?.length) {
    return <h1>There are no products!</h1>;
  }

  return (
    <Container>
      {products.map((product) => {
        return (
            <li>{product.name}</li>
        );
      })}
    </Container>
  );
}

export default Products;
