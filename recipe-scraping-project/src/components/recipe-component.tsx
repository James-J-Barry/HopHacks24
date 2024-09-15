import { Box, Heading, Button, Image, Text } from "@chakra-ui/react";
import { RecipeData } from "../shared/models/recipe-model";
import { useNavigate } from "react-router-dom";

interface RecipeComponentProps {
    recipe: RecipeData;
    onUpdate: (updatedRecipe: RecipeData) => void;
}

export function RecipeComponent({ recipe }: RecipeComponentProps) {
    const navigate = useNavigate();

    const truncateText = (text: string, length: number) => {
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    return (
        <Box
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            w="100%"
            backgroundColor="white"
            mb={4}
            maxW="800px"
        >
            <Heading as="h2" size="md" mb={4}>
                {recipe.name}
            </Heading>
            {recipe.image && (
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    mb={4}
                    boxSize="200px" 
                    objectFit="cover"
                />
            )}
            <Text mb={2}>
                <strong>Ingredients:</strong>{" "}
                {truncateText(recipe.ingredients?.join(", ") || "", 100)}
            </Text>
            <Text mb={2}>
                <strong>Instructions:</strong>{" "}
                {truncateText(recipe.instructions?.join(". ") || "", 100)}
            </Text>
            <Text mb={2}>
                <strong>Nutrition Info:</strong>{" "}
                {truncateText(recipe.nutritionInfo?.join(", ") || "", 100)}
            </Text>
            <Button
                colorScheme="teal"
                onClick={() => navigate(`/recipe-details/${recipe._id}`)} 
                mt={4}
            >
                View Details
            </Button>
        </Box>
    );
}
