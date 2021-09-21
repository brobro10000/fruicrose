import { Carousel, Container } from "react-bootstrap";
import strawberry from "../assets/images/strawberryhero.jpg";
import orange from "../assets/images/orangehero.jpg";
import peach from "../assets/images/peachhero.jpg";

function Hero() {
  return (
    <Container>
      <Carousel variant="dark">
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={strawberry}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={orange}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src={peach}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Hero;
