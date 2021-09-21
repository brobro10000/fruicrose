import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Nav,
  Navbar,
  Container,
  Image,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import banana from "../assets/images/bananaHome.gif";
import { UPDATE_LOGIN } from "../utils/actions";
import ModalObject from "./ModalObject";
import Auth from "../utils/auth";

function Navigation(props) {
  const nav = ["Products", "Contact Us"];
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
  }, [show]);

  function showNavButtons() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Row>
            <Col>
              <Button variant="warning" onClick={() => Auth.logout()}>
                Log Out
              </Button>
            </Col>
          </Row>
          <ModalObject type={type} />
        </>
      );
    } else {
      return (
        <>
          <Nav.Link>
            <Button variant="warning" onClick={handleShow}>
              LogIn
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button variant="warning" onClick={handleShow}>
              SignUp
            </Button>
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
    >
      <Container fluid>
        <Navbar.Brand className="myName">
          <Image
            className="brandImage"
            src={banana}
            width="100"
            height="70"
            rounded
          />
          Fruictose
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse align="end" id="responsive-navbar-nav">
          <Nav className="me-auto">
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
