import { Navbar, Nav, Container } from "react-bootstrap";
import "./navbar-component.css";
import { Flex } from "@chakra-ui/react";
import AuthProfile from "../auth-profile-component";
import { AuthLogout } from "../auth-logout-component";

export function NavbarComponent() {
    return (
        <Navbar bg="light" expand="lg" fixed="top" className="navbar">
            <Container fluid>
                <Flex display="flex" flexDirection="row">
                    <Navbar.Brand className="navbar-brand">
                        Recipe Manager
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse
                        id="navbarSupportedContent"
                        className="justify-content-end"
                    >
                        <Nav className="mr-auto">
                            <Flex display="flex" flexDirection="row">
                                <Nav.Link
                                    href="/recipe-page"
                                    className="custom-nav-link"
                                >
                                    Recipes
                                    <img
                                        src="../../../images/dashboard.png"
                                        alt="Recipes"
                                        className="navbar-img"
                                    />
                                </Nav.Link>
                                <Nav.Link
                                    href="/add-recipe-page"
                                    className="custom-nav-link"
                                >
                                    Add Recipe
                                    <img
                                        src="../../../images/dashboard.png"
                                        alt="Add Recipe"
                                        className="navbar-img"
                                    />
                                </Nav.Link>
                                <Nav.Link
                                    href="/image-upload-page"
                                    className="custom-nav-link"
                                >
                                    Image Page
                                    <img
                                        src="../../../images/image-upload.png"
                                        alt="Image Upload Page"
                                        className="navbar-img"
                                    />
                                </Nav.Link>
                                <Nav.Link>
                                    <AuthProfile />
                                </Nav.Link>
                                <Nav.Link>
                                    <AuthLogout />
                                </Nav.Link>
                            </Flex>
                        </Nav>
                    </Navbar.Collapse>
                </Flex>
            </Container>
        </Navbar>
    );
}
