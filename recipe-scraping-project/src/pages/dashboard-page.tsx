import { useEffect, useState } from "react";
import RecipesService from "../shared/services/recipes.service";
import { RecipeData } from "../shared/models/recipe-model";
import { NavbarComponent } from "../components/navbar/navbar-component.tsx";

export default function Dashboard() {
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
        } catch (err) {
            setError("Failed to add recipe");
        }
    };

    return (
        <div className="App">
            <NavbarComponent />
            <h1>Recipes</h1>
            {error ? (
                <div>Error: {error}</div>
            ) : recipes ? (
                <div>
                    {recipes.map((recipe) => (
                        <div key={recipe._id}>
                            <h2>{recipe.name}</h2>
                            <p>Ingredients: {recipe.ingredients?.join(", ")}</p>
                            <p>
                                Instructions: {recipe.instructions?.join(". ")}
                            </p>
                            <p>
                                Nutrition Info:{" "}
                                {recipe.nutritionInfo?.join(", ")}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}

            <h2>Add a New Recipe</h2>
            <input
                type="text"
                placeholder="Name"
                value={newRecipe.name}
                onChange={(e) =>
                    setNewRecipe({ ...newRecipe, name: e.target.value })
                }
            />
            <textarea
                placeholder="Ingredients (comma separated)"
                onChange={(e) =>
                    setNewRecipe({
                        ...newRecipe,
                        ingredients: e.target.value.split(","),
                    })
                }
            />
            <textarea
                placeholder="Instructions (period separated)"
                onChange={(e) =>
                    setNewRecipe({
                        ...newRecipe,
                        instructions: e.target.value.split("."),
                    })
                }
            />
            <textarea
                placeholder="Nutrition Info (comma separated)"
                onChange={(e) =>
                    setNewRecipe({
                        ...newRecipe,
                        nutritionInfo: e.target.value.split(","),
                    })
                }
            />
            <button onClick={handleAddRecipe}>Add Recipe</button>
        </div>
    );
}
