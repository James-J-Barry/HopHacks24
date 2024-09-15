import { useAuth0 } from "@auth0/auth0-react";
import { Flex } from '@chakra-ui/react';

const AuthProfile: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div>
            <Flex display="flex" flexDirection="row">
                <h2>{user.name}</h2>
                {user.picture && (
                    <img src={user.picture} alt={user.name || "User"} style={{ width: "40px", height: "40px" }} />
                )}
            </Flex>
            
        </div>
    );
};

export default AuthProfile;
