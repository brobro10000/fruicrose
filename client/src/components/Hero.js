import react, { useEffect, useState } from 'react'
import { Carousel, Container } from "react-bootstrap";
import strawberry from "../assets/images/strawberryhero.jpg";
import orange from "../assets/images/orangehero.jpg";
import peach from "../assets/images/peachhero.jpg";

function Hero() {
  const images = [`${strawberry}?text=First slide&bg=${strawberry}`, `${orange}?text=First slide&bg=${orange}`, `${peach}?text=First slide&bg=${peach}`]
  const [hero, loadHero] = useState((<></>))
  useEffect(() => {
    return loadHero(
      <Carousel controls={false} slide={true}>
        <Carousel.Item >
          <img
            className="d-block w-100"
            src={images[0]}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Fresh fruit at the click of a button</h3>
            <p>It's never been easier to obtain your own delicious fruits.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-100"
            src={images[1]}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Ethically sourced</h3>
            <p>All organic and sustainably grown at local farms.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-100"
            src={images[2]}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Want to learn more?</h3>
            <p>Check out our contact page to get ahold of us.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>)
  }, [])
  return (
    <Container>
      {hero ? hero : (<></>)}
      </Container>
  );
}

export default Hero;
