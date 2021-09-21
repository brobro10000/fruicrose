import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Navbar, Container, Image, Row, Col, Button } from "react-bootstrap";
import banana from "../assets/images/banana.gif";
import { UPDATE_LOGIN } from '../utils/actions';
import ModalObject from './ModalObject'
import Auth from "../utils/auth";

function Navigation(props) {
  const nav = ["Products", "Contact Us"];
  const isOpen = useSelector(state => state.currentForm)
    const [show, setShow] = useState(isOpen);
    const [type, setType] = useState(0)
    const dispatch = useDispatch()
    const handleShow = (e) => {
        if(e.target.innerHTML === 'Log In'){
            setType(0)
        } else if(e.target.innerHTML === 'Sign Up'){
            setType(1)
        }
        setShow(true)
            dispatch({
                type: UPDATE_LOGIN,
                currentForm: show,
            })
            console.log(isOpen)  
            return type
    };
    useEffect(() => {
        dispatch({
            type: UPDATE_LOGIN,
            currentForm: show,
        })
    },[show])

  function showNavButtons() {
    if (Auth.loggedIn()) {
      return (
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <Button variant="primary" onClick={() => Auth.logout()}>
                Log Out
              </Button>
            </Col>
          </Row>
          <ModalObject type={type} />
        </Container>
      );
    } else {
      return (
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={handleShow}>
                Log In
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleShow}>
                Sign Up
              </Button>
            </Col>
          </Row>
          <ModalObject type={type} />
        </Container>
      );
    }
  }

  return (
    <Navbar
      fixed="top"
      id="headerNav"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Image className="brandImage" src={banana} />
        <Navbar.Brand className="myName">Fruictose</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse align="end" id="responsive-navbar-nav">
          <Nav className="me-auto">
            {nav.map((nav) => (
              <Nav.Link
                key={nav}
                href={"#" + nav.toLowerCase().trim().replace(" ", "")}
              >
                {nav}
              </Nav.Link>
            ))}
          </Nav>
          {showNavButtons()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
