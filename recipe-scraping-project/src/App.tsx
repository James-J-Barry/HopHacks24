import { useEffect, useState } from "react";
import RecipesService from "./shared/services/recipes.service";
import { RecipeData } from "./shared/models/recipe-model";
import LoginComponent from "./pages/login-component";

export default function App(): JSX.Element {
    
    return (
        <LoginComponent />
    );
}
