import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UPDATE_LOGIN } from "../utils/actions";
import ModalObject from "./ModalObject";
import Auth from "../utils/auth";

function Navigation() {
  const fruitIcons = [
    "fas fa-apple-alt",
    "fas fa-lemon",
    "far fa-lemon",
    "fas fa-seedling",
  ];
  const isOpen = useSelector((state) => state.currentForm);
  const [show, setShow] = useState(isOpen);
  const [type, setType] = useState(0);
  const [fruit, setFruit] = useState(fruitIcons[0]);
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

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    var randomIndex = getRandom(0, fruitIcons.length - 1);
    return setFruit(fruitIcons[randomIndex]);
  }, [fruit]);

  function showNavButtons() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link variant="warning" onClick={() => Auth.logout()}>
            LogOut
          </Nav.Link>

          <ModalObject type={type} />
        </>
      );
    } else {
      return (
        <>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
          <Nav.Link variant="warning" onClick={handleShow}>
            LogIn
          </Nav.Link>
          <Nav.Link variant="warning" onClick={handleShow}>
            SignUp
          </Nav.Link>

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
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <h1 className="myName">
            <i className={fruit}></i> Fruicrose{" "}
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse align="end" id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/About">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>{showNavButtons()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
