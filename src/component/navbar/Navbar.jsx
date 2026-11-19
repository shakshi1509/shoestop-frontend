import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function CollapsibleExample() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">ShoeStop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="light" as={Link} to="/login" className="px-4">Login</Button>
                        <Button variant="outline-light" as={Link} to="/signup" className="px-4">Signup</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;