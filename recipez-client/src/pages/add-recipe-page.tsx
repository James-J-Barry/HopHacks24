import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipesService from "../shared/services/recipes.service";
import { RecipeData } from "../shared/models/recipe-model";
import {
    Box,
    Heading,
    Input,
    Textarea,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Text,
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
        image: "",
    });

    const recipesService = RecipesService();
    const navigate = useNavigate();

    const handleAddRecipe = async () => {
        setError(null);
        try {
            const addedRecipe = await recipesService.addRecipe(newRecipe);
            setRecipes((prevRecipes) =>
                prevRecipes ? [...prevRecipes, addedRecipe] : [addedRecipe]
            );
            setNewRecipe({
                name: "",
                ingredients: [],
                instructions: [],
                nutritionInfo: [],
                image: "",
            });
            navigate("/recipes-page");
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
                    maxW="600px"
                    w="100%"
                    backgroundColor="white"
                >
                    <Heading as="h2" size="lg" textAlign="center" mb={4}>
                        Add a New Recipe{" "}
                        <Text as="span" color="red.500">
                            *
                        </Text>
                    </Heading>
                    <Text
                        fontSize="sm"
                        color="gray.500"
                        textAlign="center"
                        mb={4}
                    >
                        Fields marked with{" "}
                        <Text as="span" color="red.500">
                            *
                        </Text>{" "}
                        are required
                    </Text>
                    <FormControl id="name" isRequired mb={2}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Name"
                            value={newRecipe.name}
                            onChange={(e) =>
                                setNewRecipe({
                                    ...newRecipe,
                                    name: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <FormControl id="ingredients" isRequired mb={2}>
                        <FormLabel>Ingredients</FormLabel>
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
                        />
                    </FormControl>
                    <FormControl id="instructions" isRequired mb={2}>
                        <FormLabel>Instructions</FormLabel>
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
                        />
                    </FormControl>
                    <FormControl id="nutritionInfo" isRequired mb={2}>
                        <FormLabel>Nutrition Info</FormLabel>
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
                        />
                    </FormControl>
                    <FormControl id="image" mb={2}>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <Input
                            placeholder="Image URL"
                            value={newRecipe.image || ""}
                            onChange={(e) =>
                                setNewRecipe({
                                    ...newRecipe,
                                    image: e.target.value,
                                })
                            }
                        />
                    </FormControl>
                    <Button
                        onClick={handleAddRecipe}
                        colorScheme="teal"
                        mt={4}
                        w="100%"
                    >
                        Add Recipe
                    </Button>
                </Box>
            </Flex>
        </>
    );
}
