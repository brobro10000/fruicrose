import { useState } from 'react'
import Products from "../components/Products";
import Hero from "../components/Hero";
import Contact from "../pages/Contact";
import { Button, Toast, Container } from "react-bootstrap"
const Home = () => {
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => {
    setTimeout(() => {
      window.scrollBy(0, 700);
    }, 250)
    setShowA(!showA)
    console.log(showA)
  }
  const [home, setHome] = useState(0)
  return (
    <div className="background">
      <Hero />
      <Products />
      <Container className='toastContainer'>
        <Button variant='success' size="lg" onClick={toggleShowA} className="contactUsBtn newBorder mb-2">
          Contact Us
        </Button>
        <Toast id='contact-toast' className='modalObject' show={showA} onClose={toggleShowA}>
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
