import { ImageUpload } from "../components/image-upload.component";
import { Container, Flex, Heading, Box } from "@chakra-ui/react";
import { NavbarComponent } from "../components/navbar/navbar-component";

export default function ImageUploadPage() {
    return (
        <>
            <NavbarComponent />
            <Flex
                minH="100vh"
                align="center"
                justify="center"
                bg="gray.300"
                p={4}
            >
                <Container maxW="md" centerContent>
                    <Box
                        p={4}
                        borderWidth={1}
                        borderRadius="lg"
                        boxShadow="lg"
                        bg="white"
                        maxW="600px"
                        w="100%"
                    >
                        <Heading as="h2" size="lg" mb={4} textAlign="center">
                            Upload Recipe for Nutrition Info
                        </Heading>
                        <ImageUpload />
                    </Box>
                </Container>
            </Flex>
        </>
    );
}
