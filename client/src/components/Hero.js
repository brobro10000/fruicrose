import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import strawberry from "../assets/images/strawberryheroAVIF.avif";
import orange from "../assets/images/orangeheroAVIF.avif";
import peach from "../assets/images/peachheroAVIF.avif";

function Hero() {
  const [hero, loadHero] = useState(<></>);
  useEffect(() => {
    return loadHero(
      <Carousel slide={true}>
        <Carousel.Item>
          <img
            className="d-block w-100 heroBorder"
            src={strawberry}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Fresh fruit at the click of a button</h3>
            <p>It's never been easier to obtain your own delicious fruits.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 heroBorder"
            src={orange}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Ethically sourced</h3>
            <p>All organic and sustainably grown at local farms.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 heroBorder"
            src={peach}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Want to learn more?</h3>
            <p>Check out our contact page to get ahold of us.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }, []);
  return <Container>{hero ? hero : <></>}</Container>;
}

export default Hero;
