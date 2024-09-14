import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
  Flex,
  Container,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,

} from "@chakra-ui/react";

const AuthLogout = () => {
  const { logout } = useAuth0();

  return (
    <Box
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      w="100%"
      backgroundColor={"blue.100"}
      >
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
        </button>
      </Box>
  );
};

export default AuthLogout;