import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import { StrictMode } from "react";

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <Auth0Provider
            domain="dev-lx5lijszjsaxjcw5.us.auth0.com"
            clientId="lrUTsHCL66dg1N6ykzwszsbqzLtYTTLu"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <App />
        </Auth0Provider>
    </StrictMode>
);
