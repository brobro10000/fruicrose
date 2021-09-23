import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { UPDATE_USER } from "../utils/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";

function Dashboard() {
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log(user);
  }

  // useEffect(() => {
  //     if(data) {
  //         console.log(data);
  //         dispatch({
  //             type: UPDATE_USER,
  //             user: data.user
  //         })}

  //     return() => {
  //         dispatch({
  //             type: UPDATE_USER,
  //             user: {}
  //         })}
  // }, [loading, data, dispatch, user])

  return (
    <div>
      {user && user.orders ? (
        <>
          <h1>Hello {user.username}!</h1>
          <h2>Orders:</h2>
          {user.orders.map((order) => (
            <Card key={order._id}>
              <Card.Header>
                <Card.Title>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </Card.Title>
                <Card.Subtitle>Purchased Items</Card.Subtitle>
              </Card.Header>
              <ListGroup>
                {order.products.map((product) => (
                  <ListGroup.Item>
                    {product.name}, ${product.price.toFixed(2)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ))}
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;
