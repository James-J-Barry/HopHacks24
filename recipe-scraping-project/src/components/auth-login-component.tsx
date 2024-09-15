import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function AuthLogin() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/recipes-page");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        await loginWithRedirect();
    };

    return (
        <Box
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            w="100%"
            backgroundColor={"blue.100"}
        >
            <button onClick={handleLogin}>Log In</button>
        </Box>
    );
}
