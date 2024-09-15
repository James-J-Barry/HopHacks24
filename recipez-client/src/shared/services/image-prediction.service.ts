import axios from 'axios';
import { environment } from '../../environments/environment';

// Define the base URL for the API
const API_BASE_URL = environment.apiUrl;

const imagePredictionService = {
    predictImage: async (file: File): Promise<string> => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Send POST request to the backend API to get the prediction
            const response = await axios.post<{ prediction: string }>(`${API_BASE_URL}/predict`, formData);
            return response.data.prediction;
        } catch (error) {
            console.error('Error making prediction:', error);
            throw error;
        }
    }
};

export default imagePredictionService;
