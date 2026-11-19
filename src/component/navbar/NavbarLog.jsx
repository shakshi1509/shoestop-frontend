import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function NavbarLog() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">ShoeStop</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                    </Nav>

                    <Nav className="mx-5">
                        <Button
                            variant="light"
                            className="px-4"
                            onClick={handleLogout}
                        >
                            Log out
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarLog;