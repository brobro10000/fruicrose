import { Container, Row, Col } from "react-bootstrap";
function Loading() {
  return (
    <Container className= 'animate__animated animate__tada'>
      <Row>
        <Col className="mt-5" xs s md lg={4}>
          <div className="banana"></div>
        </Col>
        <Col className="mt-5" xs s md lg={4}>
          <div className="banana"></div>
        </Col>
        <Col className="mt-5" xs s md lg={4}>
          <div className="banana"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Loading;
