import {Container, Card, Row, Col, Image} from 'react-bootstrap'
import botanist from '../assets/images/Botanist.svg'
import logo from '../assets/images/LogoFruicrose.png'
function About() {
  return (
    <Container>
         <Card id='aboutCard'>
                <Row>
                    <Col md={12}>
                    <Image id='aboutImage' alt='Logo' src={logo} fluid/>  
                    </Col>
                    <Col id="aboutText" md={12}>
                        <Card.Title id='aboutTitle' >
                            My name is Hamzah Ullah, and I love to code!
                        </Card.Title>
                        <Card.Body>
                       <p> I am currently pursuing a Bachelor's Degree in Computer Engineering from the University of Central Florida with an emphasis on machine learning and robotics.
                        I am outgoing, dedicated, and open-minded. I get across to people and adjust to changes with ease.</p>
                        <p id='mission'> "Life is about the constant pursuit of knowledge, if you stop learning, you stop growing."</p>
                           <p>  Currently, I am looking for new career opportunities my current job position cannot provide.</p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        <Card id='aboutCard'>
                <Row>
                    <Col md={12}>
                        <Image id='aboutImage' alt='Distributer' src={botanist} fluid/>
                    </Col>
                    <Col id="aboutText" md={12}>
                        <Card.Title id='aboutTitle' >
                            Meet our Distributor! 
                        </Card.Title>
                        <Card.Body>
                       <p> The Botonist are a locally sourced distributor that provides us </p>
                        <p id='mission'> "Life is about the constant pursuit of knowledge, if you stop learning, you stop growing."</p>
                           <p>  Currently, I am looking for new career opportunities my current job position cannot provide.</p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
    </Container>
  );
}

export default About;
