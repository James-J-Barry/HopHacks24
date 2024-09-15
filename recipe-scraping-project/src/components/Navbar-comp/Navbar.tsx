import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';
import { Flex } from '@chakra-ui/react';
import AuthProfile from '../auth-profile-component';

export default function NavbarComponent() {
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
                                    <Nav.Link href="#about-me" className="custom-nav-link">
                                        About Me
                                        <img
                                            src="../../../images/navbar-images/person.png"
                                            alt="About Me"
                                            className="navbar-img"
                                        />
                                    </Nav.Link>
                                    <Nav.Link href="#work-experiences" className="custom-nav-link">
                                        Work Experiences
                                        <img
                                            src="../../../images/navbar-images/suitcase.png"
                                            alt="Work Experiences"
                                            className="navbar-img"
                                        />
                                    </Nav.Link>
                                    <Nav.Link href="#skills" className="custom-nav-link">
                                        Skills
                                        <img
                                            src="../../../images/navbar-images/skills.png"
                                            alt="Skills"
                                            className="navbar-img"
                                        />
                                    </Nav.Link>
                                    <AuthProfile />
                                </Flex>
                            </Nav>
                        </Navbar.Collapse>
                    </Flex>
                </Container>
                
            </Navbar>
    );
}