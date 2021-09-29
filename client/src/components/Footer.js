import { Navbar, Container } from 'react-bootstrap';

function Footer() {
    return (
        <Navbar bg="dark" variant="dark" className="footer">
            <Container>
                <Navbar.Brand >
                <h1 className="myName">Fruicrose </h1>
                </Navbar.Brand>
                <Navbar.Text>Made with love</Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default Footer;