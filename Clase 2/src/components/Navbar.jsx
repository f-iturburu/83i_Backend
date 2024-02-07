import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100">
      <Container className="mx-3 w-100">
        <Navbar.Brand href="/home">
          <Image className="img-fluid w-25" src="/src/assets/logo.png"></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link
              href="https://rollingcode.co/#RollingCodeLabs"
              target="_blank"
            >
              Studio
            </Nav.Link>
            <Nav.Link href="https://rollingcode.co/#RollingCodeStudio"   target="_blank">
              School
            </Nav.Link>
            <Nav.Link
              href="https://rollingcode.co/#RollingCodeSchool"
              target="_blank"
              className="me-auto"
            >
              Sobre Nosotros
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
