import { Container, Row, Col } from "react-bootstrap";
function Loading() {
  return (
    <Container>
      <Row>
        <Col className="mt-5" xs s md lg={4}>
          <div class="banana"></div>
        </Col>
        <Col className="mt-5" xs s md lg={4}>
          <div class="banana"></div>
        </Col>
        <Col className="mt-5" xs s md lg={4}>
          <div class="banana"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Loading;
