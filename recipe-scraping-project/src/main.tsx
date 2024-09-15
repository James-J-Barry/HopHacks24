import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";

const root = createRoot(document.getElementById("root")!);

root.render(
    <ChakraProvider>
        <Auth0Provider
            domain="dev-h7f5x2f6f72tbl0u.us.auth0.com"
            clientId="FuHhadAPRUNBGstEJ3biRIstt31R5Gxm"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <App />
        </Auth0Provider>
    </ChakraProvider>
);
