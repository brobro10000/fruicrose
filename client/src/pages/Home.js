import { useState } from 'react'
import Products from "../components/Products";
import Hero from "../components/Hero";
import Contact from "../pages/Contact";
import { Button, Toast, Container } from "react-bootstrap"
const Home = () => {
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [home, setHome] = useState(0)
  return (
    <div>
      <Hero />
      <Products />
      <Container className='toastContainer'>
        <Button variant='success' onClick={toggleShowA} className="contactUsBtn mb-2">
          Contact Us
        </Button>
        <Toast className='modalObject' show={showA} onClose={toggleShowA}>
          <Toast.Body className='cardBackground'>
            <Contact
            home={home} 
            />
          </Toast.Body>
        </Toast>
      </Container>
    </div>
  );
};

export default Home;
