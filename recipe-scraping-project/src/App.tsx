import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { NavbarComponent } from "./components/navbar/navbar-component";
import LoginPage from "./pages/login-page";
import DashboardPage from "./pages/dashboard-page";
import ImageUploadPage from "./pages/image-upload-page";

export default function App() {
    return (
        <ChakraProvider>
            <Router>
                {/* Always show Navbar */}
                <NavbarComponent />
                <Routes>
                    {/* Default route: Go to login */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard-page" element={<DashboardPage />} />
                    <Route path="/image-upload-page" element={<ImageUploadPage />} />
                    {/* Redirect any unknown route to login */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}
