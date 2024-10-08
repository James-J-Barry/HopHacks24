import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Heading,
    Spinner,
    Text,
    Image,
    Input,
    Textarea,
    Button,
    Flex,
    List,
    ListItem,
} from "@chakra-ui/react";
import RecipesService from "../shared/services/recipes.service";
import { RecipeData } from "../shared/models/recipe-model";

export default function RecipeDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedRecipe, setEditedRecipe] = useState<RecipeData | null>(null);
    const recipesService = RecipesService();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const fetchedRecipe = await recipesService.getRecipeById(id!);
                setRecipe(fetchedRecipe);
                setEditedRecipe(fetchedRecipe);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch recipe details");
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleSave = async () => {
        try {
            if (!editedRecipe || !editedRecipe._id) {
                console.error("No ID provided for the recipe to update");
                return;
            }

            const updatedRecipe = await recipesService.updateRecipe(
                editedRecipe
            );
            setRecipe(updatedRecipe);
            setIsEditing(false);
            navigate("/recipes-page");
        } catch (error) {
            console.error("Failed to update recipe", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (!recipe || !recipe._id) {
                console.error("No ID provided for the recipe to delete");
                return;
            }

            await recipesService.deleteRecipe(recipe._id);
            navigate("/recipes-page");
        } catch (error) {
            console.error("Failed to delete recipe", error);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.300" p={8}>
            <Box
                p={8}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                maxW="800px"
                w="100%"
                backgroundColor="white"
            >
                <Heading as="h2" size="lg" mb={4}>
                    {isEditing ? "Edit Details" : "Details"}
                </Heading>

                <Heading as="h3" size="md" mb={4}>
                    {isEditing ? (
                        <Input
                            placeholder="Name"
                            value={editedRecipe?.name}
                            onChange={(e) =>
                                setEditedRecipe({
                                    ...editedRecipe!,
                                    name: e.target.value,
                                })
                            }
                        />
                    ) : (
                        recipe?.name
                    )}
                </Heading>

                {isEditing ? (
                    <Input
                        placeholder="Image URL"
                        value={editedRecipe?.image}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe!,
                                image: e.target.value,
                            })
                        }
                        mb={4}
                    />
                ) : (
                    recipe?.image && (
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            mb={4}
                            boxSize="400px"
                            objectFit="cover"
                        />
                    )
                )}

                <Text mb={2}>
                    <strong>Ingredients:</strong>
                </Text>
                {isEditing ? (
                    <Textarea
                        placeholder="Ingredients (comma separated)"
                        value={editedRecipe?.ingredients?.join(", ")}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe!,
                                ingredients: e.target.value
                                    .split(",")
                                    .map((item) => item.trim()),
                            })
                        }
                        mb={4}
                    />
                ) : (
                    <List spacing={2}>
                        {recipe?.ingredients?.map((ingredient, index) => (
                            <ListItem key={index}>
                                {index + 1}. {ingredient}
                            </ListItem>
                        ))}
                    </List>
                )}
                <Text mb={2}>
                    <strong>Instructions:</strong>
                </Text>
                {isEditing ? (
                    <Textarea
                        placeholder="Instructions (period separated)"
                        value={editedRecipe?.instructions?.join(". ")}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe!,
                                instructions: e.target.value
                                    .split(".")
                                    .map((item) => item.trim()),
                            })
                        }
                        mb={4}
                    />
                ) : (
                    <List spacing={2}>
                        {recipe?.instructions?.map((instruction, index) => (
                            <ListItem key={index}>
                                {index + 1}. {instruction}
                            </ListItem>
                        ))}
                    </List>
                )}
                <Text mb={2}>
                    <strong>Nutrition Info:</strong>
                </Text>
                {isEditing ? (
                    <Textarea
                        placeholder="Nutrition Info (comma separated)"
                        value={editedRecipe?.nutritionInfo?.join(", ")}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe!,
                                nutritionInfo: e.target.value
                                    .split(",")
                                    .map((item) => item.trim()),
                            })
                        }
                        mb={4}
                    />
                ) : (
                    <List spacing={2}>
                        {recipe?.nutritionInfo?.map((info, index) => (
                            <ListItem key={index}>
                                {index + 1}. {info}
                            </ListItem>
                        ))}
                    </List>
                )}
                {isEditing ? (
                    <>
                        <Button colorScheme="teal" onClick={handleSave} mr={2}>
                            Save
                        </Button>
                        <Button
                            colorScheme="gray"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            colorScheme="blue"
                            onClick={() => setIsEditing(true)}
                            mt={4}
                            mr={2}
                        >
                            Edit
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={handleDelete}
                            mt={4}
                            mr={2}
                        >
                            Delete
                        </Button>
                        <Button
                            colorScheme="gray"
                            onClick={() => navigate("/recipes-page")}
                            mt={4}
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </Box>
        </Flex>
    );
}
