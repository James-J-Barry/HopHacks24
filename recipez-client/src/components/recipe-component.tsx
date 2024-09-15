import {
    Box,
    Heading,
    Button,
    Image,
    Text,
    List,
    ListItem,
} from "@chakra-ui/react";
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
                <strong>Ingredients:</strong>
            </Text>
            <List spacing={2}>
                {recipe.ingredients?.map((ingredient, index) => (
                    <ListItem key={index}>
                        {index + 1}. {truncateText(ingredient, 100)}
                    </ListItem>
                ))}
            </List>
            <Text mb={2}>
                <strong>Instructions:</strong>
            </Text>
            <List spacing={2}>
                {recipe.instructions?.map((instruction, index) => (
                    <ListItem key={index}>
                        {index + 1}. {truncateText(instruction, 100)}
                    </ListItem>
                ))}
            </List>
            <Text mb={2}>
                <strong>Nutrition Info:</strong>
            </Text>
            <List spacing={2}>
                {recipe.nutritionInfo?.map((info, index) => (
                    <ListItem key={index}>
                        {index + 1}. {truncateText(info, 100)}
                    </ListItem>
                ))}
            </List>
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
