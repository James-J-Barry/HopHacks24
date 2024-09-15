import { useEffect, useState } from "react";
import RecipesService from "../shared/services/recipes.service";
import { RecipeData } from "../shared/models/recipe-model";
import {
    Box,
    Heading,
    Input,
    Textarea,
    Button,
    Alert,
    AlertIcon,
    Spinner,
    Flex,
} from "@chakra-ui/react";
import { NavbarComponent } from "../components/navbar/navbar-component";

export default function RecipePage() {
    const [recipes, setRecipes] = useState<RecipeData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [newRecipe, setNewRecipe] = useState<RecipeData>({
        name: "",
        ingredients: [],
        instructions: [],
        nutritionInfo: [],
    });

    const recipesService = RecipesService();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await recipesService.getRecipes();
                setRecipes(fetchedRecipes);
            } catch (err) {
                setError("Failed to fetch recipes");
            }
        };

        fetchRecipes();
    }, []);

    return (
        <>
            <NavbarComponent />
            <Flex minH="100vh" align="center" justify="center" bg="gray.300">
            <Box p={8}>
                <Heading mb={4}>Recipes</Heading>
                {error ? (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {error}
                    </Alert>
                ) : recipes ? (
                    <Box
                    p={8}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    w="100%"
                    backgroundColor={"white"}
                    >   
                        {recipes.map((recipe) => (
                            <Box key={recipe._id} mb={4}>
                                <Heading as="h2" size="md">
                                    {recipe.name}
                                </Heading>
                                <p>
                                    Ingredients:{" "}
                                    {recipe.ingredients?.join(", ")}
                                </p>
                                <p>
                                    Instructions:{" "}
                                    {recipe.instructions?.join(". ")}
                                </p>
                                <p>
                                    Nutrition Info:{" "}
                                    {recipe.nutritionInfo?.join(", ")}
                                </p>

                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Spinner />
                )}
            </Box>
            </Flex>
        </>
    );
}
