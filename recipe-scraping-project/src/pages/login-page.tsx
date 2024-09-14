import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
    Box,
    Heading,
    VStack,
    Alert,
    AlertIcon,
    Spinner,
} from "@chakra-ui/react";
import ProfileComponent from "../components/auth-profile-component";
import LoginButton from "../components/auth-login-component";
import LogoutButton from "../components/auth-logout-component";

const LoginPage: React.FC = () => {
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
        <Box maxW="sm" mx="auto" mt="8">
            <VStack spacing={4} align="stretch">
                <Heading as="h1" size="xl" textAlign="center">
                    Recipe Manager
                </Heading>
                <Heading as="h2" size="lg" textAlign="center">
                    Login
                </Heading>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error.message}
                    </Alert>
                )}
                {isAuthenticated ? (
                    <>
                        <ProfileComponent />
                        <LogoutButton />
                    </>
                ) : (
                    <LoginButton />
                )}
            </VStack>
        </Box>
    );
};

export default LoginPage;
