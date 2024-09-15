import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
    Box,
    Heading,
    Spinner,
    Flex,
    Container,
    Center,
} from "@chakra-ui/react";
import { AuthLogin } from "../components/auth-login-component";

export default function LoginPage() {
    const { isAuthenticated, isLoading, error } = useAuth0();
    const navigate = useNavigate();

    if (isLoading) {
        return <Spinner />;
    }

    if (isAuthenticated) {
        // If already authenticated, navigate to the dashboard
        navigate("/dashboard");
    }

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
                    <Heading
                        as="h2"
                        size="lg"
                        mb={6}
                        textAlign="center"
                    ></Heading>

                    <AuthLogin />
                </Box>
            </Container>
        </Flex>
    );
}
