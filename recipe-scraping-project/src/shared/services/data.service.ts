import axios from "axios";
import { useState } from "react";
import { environment } from "../../environments/environment";
import { RecipeData } from "../models/recipe-model";

const apiUrl = `${environment.apiUrl}/recipes`;

const DataService = () => {
    const [recipeData, setRecipeData] = useState<RecipeData | null>(null);

    const getRecipes = async (): Promise<any> => {
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch recipes", error);
        }
    };

    const getRecipeById = async (id: string): Promise<any> => {
        try {
            const response = await axios.get(`${apiUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch recipe by ID", error);
        }
    };

    const addRecipe = async (data: RecipeData): Promise<any> => {
        try {
            const response = await axios.post(apiUrl, data);
            return response.data;
        } catch (error) {
            console.error("Failed to add recipe", error);
        }
    };

    const updateRecipe = async (data: RecipeData): Promise<any> => {
        try {
            if (!data._id)
                throw new Error("No ID provided for the recipe to update");
            const response = await axios.put(`${apiUrl}/${data._id}`, data);
            return response.data;
        } catch (error) {
            console.error("Failed to update recipe", error);
        }
    };

    const deleteRecipe = async (id: string): Promise<any> => {
        try {
            const response = await axios.delete(`${apiUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to delete recipe", error);
        }
    };

    const setTemporaryRecipeData = (data: RecipeData) => setRecipeData(data);
    const getTemporaryRecipeData = (): RecipeData | null => recipeData;
    const clearTemporaryRecipeData = () => setRecipeData(null);

    return {
        getRecipes,
        getRecipeById,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        setTemporaryRecipeData,
        getTemporaryRecipeData,
        clearTemporaryRecipeData,
    };
};

export default DataService;
