import { Carousel, Container } from "react-bootstrap";
import strawberry from "../assets/images/strawberryhero.jpg";
import orange from "../assets/images/orangehero.jpg";
import peach from "../assets/images/peachhero.jpg";

function Hero() {
  return (
    <Container>
      <Carousel>
        <Carousel.Item interval={5000}>       
          <img
            className="d-block w-100"
            src={strawberry}
            alt="First slide"
          />         
          <Carousel.Caption>
            <h3>Fresh fruit at the click of a button</h3>
            <p>It's never been easier to obtain your own delicious fruits.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>         
          <img
            className="d-block w-100"
            src={orange}
            alt="First slide"
          />          
          <Carousel.Caption>
            <h3>Ethically sourced</h3>
            <p>All organic and sustainably grown at local farms.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>          
          <img
            className="d-block w-100"
            src={peach}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Want to learn more?</h3>
            <p>Check out our contact page to get ahold of us.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Hero;
