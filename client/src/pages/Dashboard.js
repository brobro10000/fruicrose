import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/actions";
import { Card, ListGroup, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

function Dashboard() {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { loading, data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log(user);
  }

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch({
        type: UPDATE_USER,
        user: data.user,
      });
    }

    return () => {
      dispatch({
        type: UPDATE_USER,
        user: {},
      });
    };
  }, [loading, data, dispatch, user]);

  return (
    <Container>
      {user && user.orders ? (
        <>
          <div className="centerContainer">
          <h1 className="center newBorder">Hello {user.username}!</h1>
          </div>
          <h2>Orders:</h2>
          {user.orders.map((order) => (
            <Card key={order._id} className="dashboardCard">
              <Card.Header>
                <Card.Title>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </Card.Title>
                <Card.Subtitle>Order Number: #{order._id}</Card.Subtitle>
                <br />
                <Card.Subtitle>Purchased Items</Card.Subtitle>
              </Card.Header>
              <ListGroup>
                {order.products.map((product) => (
                  <ListGroup.Item key={product._id}>
                    {product.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ))}
        </>
      ) : null}
      <div className="productContainer"></div>
    </Container>
  );
}

export default Dashboard;
