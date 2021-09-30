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
      <Contact />
       
    </div>
  );
};

export default Home;
