import { Flex, Box, Heading, Container, Center } from "@chakra-ui/react";
import { AuthLogin } from "../components/auth-login-component";

export default function LoginPage() {
    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.300">
            <Container maxW="md" centerContent>
                <Box
                    p={8}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    w="100%"
                    backgroundColor={"white"}
                >
                    <Center mb={6}>
                        <Heading>Recipe Manager</Heading>
                    </Center>
                    <Heading as="h2" size="lg" mb={6} textAlign="center">
                        Please Log In
                    </Heading>
                    <AuthLogin />
                </Box>
            </Container>
        </Flex>
    );
}
