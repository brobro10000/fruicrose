import React from "react";
import { Nav, Navbar, Container, Image } from "react-bootstrap";
import banana from "../assets/images/banana.gif";
import Login from "../components/Login";
function Navigation(props) {
  const nav = ["Products", "Contact Us"];

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
          <Login />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
