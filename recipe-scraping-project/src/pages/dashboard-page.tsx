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
} from "@chakra-ui/react";

export default function DashboardPage() {
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

    const handleAddRecipe = async () => {
        try {
            const addedRecipe = await recipesService.addRecipe(newRecipe);
            setRecipes((prevRecipes) =>
                prevRecipes ? [...prevRecipes, addedRecipe] : [addedRecipe]
            );
            // Clear new recipe form
            setNewRecipe({
                name: "",
                ingredients: [],
                instructions: [],
                nutritionInfo: [],
            });
        } catch (err) {
            setError("Failed to add recipe");
        }
    };

    return (
        <>
            <Box p={8}>
                <Heading mb={4}>Recipes</Heading>
                {error ? (
                    <Alert status="error" mb={4}>
                        <AlertIcon />
                        {error}
                    </Alert>
                ) : recipes ? (
                    <Box>
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

                <Heading as="h2" size="lg" mt={8} mb={4}>
                    Add a New Recipe
                </Heading>
                <Input
                    placeholder="Name"
                    value={newRecipe.name}
                    onChange={(e) =>
                        setNewRecipe({ ...newRecipe, name: e.target.value })
                    }
                    mb={2}
                />
                <Textarea
                    placeholder="Ingredients (comma separated)"
                    value={(newRecipe.ingredients ?? []).join(",")}
                    onChange={(e) =>
                        setNewRecipe({
                            ...newRecipe,
                            ingredients: e.target.value.split(","),
                        })
                    }
                    mb={2}
                />
                <Textarea
                    placeholder="Instructions (period separated)"
                    value={(newRecipe.instructions ?? []).join(".")}
                    onChange={(e) =>
                        setNewRecipe({
                            ...newRecipe,
                            instructions: e.target.value.split("."),
                        })
                    }
                    mb={2}
                />
                <Textarea
                    placeholder="Nutrition Info (comma separated)"
                    value={(newRecipe.nutritionInfo ?? []).join(",")}
                    onChange={(e) =>
                        setNewRecipe({
                            ...newRecipe,
                            nutritionInfo: e.target.value.split(","),
                        })
                    }
                    mb={2}
                />
                <Button onClick={handleAddRecipe} colorScheme="teal" mt={4}>
                    Add Recipe
                </Button>
            </Box>
        </>
    );
}
