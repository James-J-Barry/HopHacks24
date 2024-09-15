import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./pages/login-page";
import ImageUploadPage from "./pages/image-upload-page";
import RecipePage from "./pages/recipes-page";
import AddRecipePage from "./pages/add-recipe-page";

export default function App() {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    {/* Default route: Go to login */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/add-recipe-page" element={<AddRecipePage />} />
                    <Route path="/recipes-page" element={<RecipePage />} />
                    <Route path="/image-upload-page" element={<ImageUploadPage />} />
                    {/* Redirect any unknown route to login */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}
