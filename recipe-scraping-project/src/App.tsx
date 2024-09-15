import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./pages/login-page";
import Dashboard from "./pages/dashboard-page";
import ImagePage from "./pages/image-page";

export default function App() {
    return (
        <>
            <ChakraProvider>
                {
                    <>
                        <Router>
                            <Routes>
                                <Route path="/" element={<LoginPage />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/image-page"
                                    element={<ImagePage />}
                                />
                            </Routes>
                        </Router>
                    </>
                }
            </ChakraProvider>
        </>
    );
}
