import React from 'react';
import ImageUpload from '../components/image-upload.component';
import NavbarComponent from '../components/Navbar-comp/Navbar';
import { Container, Flex } from '@chakra-ui/react';

const ImagePage: React.FC = () => {
    return (
        <div className="App">
            <NavbarComponent/>
            <Flex minH="100vh" align="center" justify="center" bg="gray.300">
                <Container maxW="md" centerContent>
                    HELP
                    <ImageUpload />
                </Container>
            </Flex>
        </div>
    );
};

export default ImagePage;