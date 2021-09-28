import Products from "../components/Products";
import Hero from "../components/Hero";
import Contact from "../pages/Contact";
import About from "../pages/About";

const Home = () => {
    return (
        <div>
            <Hero />
            <Products />
            <Contact />
        </div>
    )
};

export default Home;