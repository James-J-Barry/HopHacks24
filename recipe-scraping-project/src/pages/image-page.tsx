import { ImageUpload } from "../components/image-upload.component";
import { NavbarComponent } from "../components/navbar/navbar-component";
import { Container, Flex } from "@chakra-ui/react";

export default function ImagePage() {
    return (
        <div className="App">
            <NavbarComponent />
            <Flex minH="100vh" align="center" justify="center" bg="gray.300">
                <Container maxW="md" centerContent>
                    HELP
                    <ImageUpload />
                </Container>
            </Flex>
        </div>
    );
}
