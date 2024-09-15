import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Image, Text } from "@chakra-ui/react";

export default function AuthProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // Placeholder image URL for an empty user profile
    const placeholderImage =
        "../../../images/empty-user-profile.png";

    const profilePicture = isLoading ? placeholderImage : user?.picture;
    const profileName = isLoading ? "Loading..." : user?.name;

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <Flex alignItems="center" ml={4}>
            <Image
                borderRadius="full"
                boxSize="30px"
                src={profilePicture}
                alt={profileName || "User"}
                mr={2}
            />
            <Text fontSize="md" fontWeight="medium" noOfLines={1}>
                {profileName}
            </Text>
        </Flex>
    );
}
