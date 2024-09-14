import React, { useState } from "react";
import imagePredictionService from "../shared/services/image-prediction.service";

const ImageUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [prediction, setPrediction] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
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
        } catch (error) {
            setError("Error uploading the image and getting prediction.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload and Predict"}
            </button>
            {prediction && <p>Prediction: {prediction}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
