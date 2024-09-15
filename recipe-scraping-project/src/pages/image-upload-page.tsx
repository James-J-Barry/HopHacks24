import { ImageUpload } from "../components/image-upload.component";
import { Container, Flex, Heading, Box } from "@chakra-ui/react";

export default function ImageUploadPage() {
    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.300">
            <Container maxW="md" centerContent>
                <Box
                    p={4}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="white"
                    w="100%"
                >
                    <Heading as="h2" size="lg" mb={4} textAlign="center">
                        Image Upload and Prediction
                    </Heading>
                    <ImageUpload />
                </Box>
            </Container>
        </Flex>
    );
}
