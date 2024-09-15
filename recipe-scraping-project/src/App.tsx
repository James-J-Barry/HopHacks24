import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavbarComponent } from "./components/navbar/navbar-component";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";
import ImageUploadPage from "./pages/image-upload-page";

export default function App() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ChakraProvider>
            <Router>
                {/* Show Navbar only if the user is authenticated */}
                {isAuthenticated && <NavbarComponent />}
                <Routes>
                    {/* Default route: if not authenticated, go to login */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated ? (
                                <DashboardPage />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/upload-image"
                        element={
                            isAuthenticated ? (
                                <ImageUploadPage />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    {/* Redirect any unknown route to login */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}
