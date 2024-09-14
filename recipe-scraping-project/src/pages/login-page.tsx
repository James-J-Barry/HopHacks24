import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (email === "jbarry28@umd.edu" && password === "HopHacks2024") {
                navigate("/dashboard");
            } else {
                setError("Login failed. Please check your email and password.");
            }
        } catch (error) {
            console.error("An error occurred during login", error);
            setError("An error occurred during login");
        }
    };

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
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        type="submit"
                        width="full"
                        mt={4}
                    >
                        Login
                    </Button>
                </form>
            </VStack>
        </Box>
    );
};

export default LoginComponent;
