import { Container, Card, Row, Col, Image } from "react-bootstrap";
import botanist from "../assets/images/Botanist.svg";
import logo from "../assets/images/LogoFruicrose.png";
function About() {
  return (
    <Container>
      <Row>
        <Col md={6} className='animate__animated animate__slideInLeft'>
          <Container id="aboutContainer1">
            <Card id="aboutCard1">
              <Row>
                <Col md={12}>
                  <Image className="aboutImage" alt="Logo" src={logo} fluid />
                </Col>
                <Col id="aboutText1" md={12}>
                  <Card.Title id="aboutTitle1">
                    Welcome to Fruicrose! Where health is in every harvest.
                  </Card.Title>
                  <Card.Body>
                    <p>
                      {" "}
                      Order some the freshest fruits in season! Perfect for
                      smoothies, home-made icecream or even by itself.
                    </p>

                    <p>
                      Shipped and delivered right to your door, our fruits are
                      guaranteed to be some of the healthiest on earth! Freeze
                      dried when it arrives, simply rehydrate in lukewarm water!
                      Prepare for the experience of your life in every bite.
                    </p>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Container>
        </Col>
        <Col md={6} className='animate__animated animate__slideInRight'>
          <Container id="aboutContainer2">
            <Card id="aboutCard2">
              <Row>
                <Col md={12}>
                  <Image
                    className="aboutImage"
                    alt="Distributer"
                    src={botanist}
                    fluid
                  />
                </Col>
                <Col id="aboutText2" md={12}>
                  <Card.Title id="aboutTitle2">
                    Meet our Distributor!
                  </Card.Title>
                  <Card.Body>
                    <p>
                      {" "}
                      The Botonist are a locally sourced distributor that
                      provides us the plants necessary for the best seasonal
                      variety of the most succulent fruits you will ever taste!
                    </p>
                    <p>
                      {" "}
                      Using our secret ratio of grow mix, we take these plants
                      above and beyond,{" "}
                      <span
                        style={{
                          textAlign: "center",
                          webkitTextStroke: "thin",
                          fontWeight: "bolder",
                          webkitTextStrokeColor: "black",
                        }}
                        className="myName"
                      >
                        SUPERCHARGING
                      </span>{" "}
                      the taste, flavor, and yields of our fruits!{" "}
                    </p>
                    <h4>Want to grow your own?</h4>
                    <p>
                      Visit them at:{" "}
                      <a href="https://the-botanist-project.herokuapp.com/">
                        https://the-botanist-project.herokuapp.com/
                      </a>{" "}
                    </p>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
