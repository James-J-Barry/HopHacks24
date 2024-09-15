import { useEffect, useState } from "react";
import RecipesService from "../shared/services/recipes.service";
import { RecipeData } from "../shared/models/recipe-model";
import {
    Box,
    Heading,
    Alert,
    AlertIcon,
    Spinner,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; 
import { NavbarComponent } from "../components/navbar/navbar-component";
import { RecipeComponent } from "../components/recipe-component";

export default function RecipePage() {
    const [recipes, setRecipes] = useState<RecipeData[] | null>(null);
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[] | null>(
        null
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const recipesService = RecipesService();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await recipesService.getRecipes();
                setRecipes(fetchedRecipes);
                setFilteredRecipes(fetchedRecipes);
            } catch (err) {
                setError("Failed to fetch recipes");
            }
        };

        fetchRecipes();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (recipes) {
            const filtered = recipes.filter(
                (recipe) => (recipe.name ?? "").toLowerCase().includes(query) 
            );
            setFilteredRecipes(filtered);
        }
    };

    const handleUpdateRecipe = (updatedRecipe: RecipeData) => {
        setRecipes((prevRecipes) =>
            prevRecipes
                ? prevRecipes.map((recipe) =>
                      recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                  )
                : [updatedRecipe]
        );
        setFilteredRecipes((prevRecipes) =>
            prevRecipes
                ? prevRecipes.map((recipe) =>
                      recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                  )
                : [updatedRecipe]
        );
    };

    return (
        <>
            <NavbarComponent />
            <Flex minH="100vh" align="center" justify="center" bg="gray.300">
                <Box p={8} maxW="800px" w="100%">
                    <Heading mb={4} textAlign="center">
                        Recipes
                    </Heading>
                    <InputGroup mb={6}>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={SearchIcon} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search Recipes..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            size="lg"
                            borderRadius="md"
                            borderWidth="2px"
                            borderColor="gray.400"
                            backgroundColor="white"
                            _hover={{ borderColor: "gray.500" }}
                            _focus={{
                                borderColor: "teal.500",
                                boxShadow: "outline",
                            }}
                        />
                    </InputGroup>
                    {error ? (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    ) : filteredRecipes ? (
                        <Box>
                            {filteredRecipes.map((recipe) => (
                                <RecipeComponent
                                    key={recipe._id}
                                    recipe={recipe}
                                    onUpdate={handleUpdateRecipe}
                                />
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
