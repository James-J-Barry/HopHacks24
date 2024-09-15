import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

export function AuthLogout() {
    const { logout } = useAuth0();

    return (
        <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={() =>
                logout({
                    logoutParams: {
                        returnTo: `${window.location.origin}/login-page`,
                    },
                })
            }
            ml={2} // Add some margin to the left to separate it from the profile
        >
            Log Out
        </Button>
    );
}
