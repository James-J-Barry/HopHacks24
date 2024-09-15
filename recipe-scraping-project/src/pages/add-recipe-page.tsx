import { useState } from "react";
import RecipesService from "../shared/services/recipes.service";
import { RecipeData } from "../shared/models/recipe-model";
import {
    Box,
    Heading,
    Input,
    Textarea,
    Button,
    Flex,
} from "@chakra-ui/react";
import { NavbarComponent } from "../components/navbar/navbar-component";

export default function AddRecipePage() {
    const [recipes, setRecipes] = useState<RecipeData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [newRecipe, setNewRecipe] = useState<RecipeData>({
        name: "",
        ingredients: [],
        instructions: [],
        nutritionInfo: [],
    });

    const recipesService = RecipesService();

    const handleAddRecipe = async () => {
        setError(null); // Clear previous errors
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
            <NavbarComponent />
            <Flex minH="100vh" align="center" justify="center" bg="gray.300">
            <Box
                    p={5}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    w="100%"
                    backgroundColor={"white"}
                >
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
                            ingredients: e.target.value
                                .split(",")
                                .map((item) => item.trim()),
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
                            instructions: e.target.value
                                .split(".")
                                .map((item) => item.trim()),
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
                            nutritionInfo: e.target.value
                                .split(",")
                                .map((item) => item.trim()),
                        })
                    }
                    mb={2}
                />
                <Button onClick={handleAddRecipe} colorScheme="teal" mt={4}>
                    Add Recipe
                </Button>
            </Box>
            </Flex>
        </>
    );
}
