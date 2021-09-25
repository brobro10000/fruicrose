import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import banana from "../assets/images/bananaHome.gif";
import { UPDATE_LOGIN } from "../utils/actions";
import ModalObject from "./ModalObject";
import Auth from "../utils/auth";

function Navigation(props) {
  const isOpen = useSelector((state) => state.currentForm);
  const [show, setShow] = useState(isOpen);
  const [type, setType] = useState(0);
  const dispatch = useDispatch();

  const handleShow = (e) => {
    if (e.target.innerHTML === "LogIn") {
      setType(0);
    } else if (e.target.innerHTML === "SignUp") {
      setType(1);
    }
    setShow(true);
    dispatch({
      type: UPDATE_LOGIN,
      currentForm: show,
    });
    console.log(isOpen);
    return type;
  };

  //eslint-disable-next-line
  useEffect(() => {
    dispatch({
      type: UPDATE_LOGIN,
      currentForm: show,
    });
    // eslint-disable-next-line
  }, [show]);

  function showNavButtons() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Button variant="warning">
            <Link to="/cart">Cart</Link>
          </Button>

          <Button variant="warning">
            <Link to="/dashboard">Dashboard</Link>
          </Button>

          <Button variant="warning" onClick={() => Auth.logout()}>
            LogOut
          </Button>

          <ModalObject type={type} />
        </>
      );
    } else {
      return (
        <>
          <Button variant="warning">
            <Link to="/cart">Cart</Link>
          </Button>

          <Button variant="warning" onClick={handleShow}>
            LogIn
          </Button>

          <Button variant="warning" onClick={handleShow}>
            SignUp
          </Button>

          <ModalObject type={type} />
        </>
      );
    }
  }

  return (
    <Navbar
      id="headerNav"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand className="myName">
          <Image
            className="brandImage"
            alt="exploding banana"
            src={banana}
            width="100"
            height="70"
            rounded
          />
          Fruicrose
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse align="end" id="responsive-navbar-nav">
          <Nav className="me-auto">
              <Link to="/About">About</Link>
              <Link to="/">Products</Link>
              <Link to="/contact">Contact</Link>
          </Nav>
          <Nav>{showNavButtons()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
