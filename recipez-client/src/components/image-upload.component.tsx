import React, { useState } from "react";
import imagePredictionService from "../shared/services/image-predictor.service";
import {
    Box,
    Button,
    Input,
    Image,
    Text,
    VStack,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

export function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await imagePredictionService.predictImage(
                selectedFile
            );
            setPrediction(result);
        } catch (err) {
            setError("Error uploading the image and getting prediction.");
        } finally {
            setLoading(false);
        }
    };

    // Clean up URL object to prevent memory leaks
    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <Box p={4} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
            <VStack spacing={4}>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    variant="unstyled"
                />
                {previewUrl && (
                    <Image
                        src={previewUrl}
                        alt="Selected file"
                        maxH="200px"
                        borderRadius="md"
                    />
                )}
                <Button
                    colorScheme="teal"
                    onClick={handleUpload}
                    isLoading={loading}
                    isDisabled={!selectedFile}
                >
                    Upload and Predict
                </Button>
                {prediction && (
                    <Text fontSize="lg" fontWeight="bold">
                        Prediction: {prediction}
                    </Text>
                )}
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
            </VStack>
        </Box>
    );
}
