import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { Container, Card, Row, Col } from "react-bootstrap";

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

  if (!products?.length) {
    return <h1>There are no products!</h1>;
  }

  return (
    <Container>
      <Row>
        {products.map((product) => {
          return (
            <Card style={{ width: "18rem", margin: "10px" }}>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.categories._id}
                </Card.Subtitle>
                <Card.Text>Quantity: {product.stock}</Card.Text>
                <Card.Text>Price: {product.price}</Card.Text>
                <Card.Link href="#">Add to cart</Card.Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
}

export default Products;
