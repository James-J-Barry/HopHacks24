import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';
import { Flex } from '@chakra-ui/react';
import AuthProfile from '../auth-profile-component';
import { useAuth0 } from "@auth0/auth0-react";

const AuthLogout = () => {
    const { logout } = useAuth0();
}
  
export default function NavbarComponent() {
    const { logout } = useAuth0(); // Import the logout function from useAuth0
    return (
            <Navbar bg="light" expand="lg" fixed="top" className="navbar">
                <Container fluid>
                    <Flex display="flex" flexDirection="row">
                        <Navbar.Brand href="#home" className="navbar-brand">
                            Recipe Manager
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarSupportedContent" />
                        <Navbar.Collapse id="navbarSupportedContent" className="justify-content-end">
                            <Nav className="mr-auto">
                                <Flex display="flex" flexDirection="row">
                                    <Nav.Link href="/dashboard" className="custom-nav-link">
                                        Dashboard
                                        <img
                                            src="../../../images/navbar-images/dashboard.png"
                                            alt="Dashboard"
                                            className="navbar-img"
                                        />
                                    </Nav.Link>
                                    <Nav.Link href="/image-page" className="custom-nav-link">
                                        Image Page
                                        <img
                                            src="../../../images/navbar-images/image.png"
                                            alt="Image Page"
                                            className="navbar-img"
                                        />
                                    </Nav.Link>
                                    <AuthProfile />
                                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                    Log Out
                                    </button>
                                </Flex>
                            </Nav>
                        </Navbar.Collapse>
                    </Flex>
                </Container>
            </Navbar>
    );
}