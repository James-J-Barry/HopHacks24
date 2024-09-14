import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-page";
import Dashboard from "./pages/dashboard-page";
import AuthLogin from "./components/auth-login-component";
import AuthProfile from "./components/auth-profile-component";
import AuthLogout from "./components/auth-logout-component";
import { ChakraProvider } from "@chakra-ui/react";
import ImageUpload from "./components/image-upload.component";

const App: React.FC = () => {
    return (
        <>
            <ChakraProvider>
                { <><Router>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                </Router></> }
                <div className="App">
                    <h1>Food Image Classification</h1>
                    <ImageUpload />
                </div>
            </ChakraProvider>
        </>
    );
};

export default App;
