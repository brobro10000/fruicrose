import { useState } from 'react'
import Products from "../components/Products";
import Hero from "../components/Hero";
import Contact from "../pages/Contact";
import { Button, Toast, Container } from "react-bootstrap"
const Home = () => {
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  return (
    <div>
      <Hero />
      <Products />
      <Container style={{ textAlign: "center"}}>
        <Button variant='success' onClick={toggleShowA} className="contactUsBtn mb-2">
          Contact Us
        </Button>
        <Toast className='modalObject' show={showA} onClose={toggleShowA}>
          <Toast.Body className='cardBackground'>
            <Contact />
          </Toast.Body>
        </Toast>
      </Container>
    </div>
  );
};

export default Home;
