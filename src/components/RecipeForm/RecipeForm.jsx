import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import "./RecipeForm.css";
import IngredientForm from '../IngredientForm/IngredientForm';
import DisplayIngredients from '../DisplayIngredients/DisplayIngredients';

function RecipeForm({setRecipes, setTab}) {

    const [isAddIngredient, setIsAddIngredient] = useState(false);
    

    const [inputRecipe, setInputRecipe] = useState({
        recipe_title: "",
        description: "",
        image_url: "",
        servings: 0,
        difficulty_level: "Easy",
        category: "Appetizer",
        cuisine_type: "American",
        ingredients: []
    });

    const [errors, setErrors] = useState({
        recipe_title: "",
        description: "",
        image_url: ""
    });

    const validateField = (id, value) => {
        const imageRegex = /\.(jpeg|jpg|png|gif|svg|webp)$/i;
        // The other validations are checked by MUI and add default values
        switch (id) {
            case "recipe_title":
                return (value.length >= 3 && value.length <= 50) ? "" : "Must have 3-50 characters";
            case "description":
                return (value.length >= 10 && value.length <= 500) ? "" : "Must have 10-500 characters";
            case "image_url":
                return (imageRegex.test(value)) ? "" : "Must have Add a correct url";
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target; // Grabbing the id and value properties from the input element
        if (id === 'recipe_title' || id === 'description' || id === 'image_url') {
            setInputRecipe(prevData => ({ ...prevData, [id]: value })); //Creating a new object, spreading old object, updating the value of the key that we are changing
            // real time validation of field information (call validateField)
            const error = validateField(id, value);
            setErrors(prevData => ({ ...prevData, [id]: error }));
        } else if (id === 'servings') {
            let inputValue = parseInt(value, 10);
            // Manually clamp the value within the allowed range on change
            if (!isNaN(inputValue)) {
                if (inputValue > 20) inputValue = 20;
                if (inputValue < 0) inputValue = 0;
                setInputRecipe(prevData => ({ ...prevData, [id]: inputValue }));
            } else {
                setInputRecipe(prevData => ({ ...prevData, [id]: '' })); // Handle non-numeric input if needed
            }
        }
    };

    // handle the onchange the textbox with select type 
    const handleChangeDifficulty = (event) => {
        setInputRecipe(prevData => ({ ...prevData, ["difficulty_level"]: event.target.value }));
    };
    const handleChangeCategory = (event) => {
        setInputRecipe(prevData => ({ ...prevData, ["category"]: event.target.value }));
    };
    const handleChangeCuisineType = (event) => {
        setInputRecipe(prevData => ({ ...prevData, ["cuisine_type"]: event.target.value }));
    };

    // If user wants to add Ingredients open the Ingredient Form
    const openIngredientForm = () => {
        // Check the all values of the RecipeForm has value
        if (Object.values(inputRecipe).every(value =>
            value !== null && value !== undefined && value !== "")) {
            setIsAddIngredient(true);
        } else {
            alert("You should enter all fields of recipe form");
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        // Check the validation was empty
        if (Object.values(inputRecipe).every(value =>
            value !== null && value !== undefined && value !== "")) {
            // set the recipe in recipes states
            setRecipes(prevData => ([...prevData, inputRecipe]));
            // Clean the whole form
            setInputRecipe({
                recipe_title: "",
                description: "",
                image_url: "",
                servings: 0,
                difficulty_level: "Easy",
                category: "Appetizer",
                cuisine_type: "American",
                ingredients: []
            });
            // Go to Display Recipe Tab
            setTab("2");
        } else {
            alert("You should enter all fields of recipe form");
        }


    }

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <h1>Recipe Form</h1>
            <TextField
                id="recipe_title"
                label="Recipe Title: Required "
                placeholder='3-50 characters'
                variant="outlined"
                required
                type='text'
                value={inputRecipe.recipe_title}
                onChange={handleChange} />
            {errors.recipe_title && <p style={{ color: "red" }}> {errors.recipe_title}</p>}
            <TextField
                id="description"
                label="Description: Required"
                placeholder='10-500 characters'
                variant="outlined"
                required
                type='text'
                value={inputRecipe.description}
                onChange={handleChange} />
            {errors.description && <p style={{ color: "red" }}> {errors.description}</p>}
            <TextField
                id="image_url"
                label="ImageUrl: Required"
                placeholder='10-500 characters'
                variant="outlined"
                required
                type='text'
                value={inputRecipe.image_url}
                onChange={handleChange} />
            {errors.image_url && <p style={{ color: "red" }}> {errors.image_url}</p>}
            <TextField
                id="servings"
                label="Servings(numeric, 1-20): Required"
                variant="outlined"
                required
                type='number'
                value={inputRecipe.servings}
                onChange={handleChange}
            />
            <TextField
                id="difficulty_level"
                select
                label="Difficulty Level: Required"
                value={inputRecipe.difficulty_level}
                onChange={handleChangeDifficulty}
                fullWidth
                required
            >
                <MenuItem id='difficulty_level_1' value="Easy">Easy</MenuItem>
                <MenuItem id='difficulty_level_2' value="Medium">Medium</MenuItem>
                <MenuItem id='difficulty_level_3' value="Hard">Hard</MenuItem>
            </TextField>
            <TextField
                id='category'
                select
                label="Category: Required"
                value={inputRecipe.category}
                onChange={handleChangeCategory}
                fullWidth
                required
            >
                <MenuItem value="Appetizer">Appetizer</MenuItem>
                <MenuItem value="Main_Course">Main Course</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
                <MenuItem value="Side_Dish">Side Dish</MenuItem>
                <MenuItem value="Beverage">Beverage</MenuItem>
            </TextField>
            <TextField
                id='cuisine_type'
                select
                label="Cuisine Type: Required"
                value={inputRecipe.cuisine_type}
                onChange={handleChangeCuisineType}
                fullWidth
                required
            >
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                <MenuItem value="Asian">Asian</MenuItem>
                <MenuItem value="Mediterranean">Mediterranean</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <div className='single_line'></div>

            <Button style={{ display: isAddIngredient ? "none" : "block" }} onClick={openIngredientForm} variant="contained" >Add Ingredient To Recipe</Button>

            {isAddIngredient && <IngredientForm isAddIngredient={isAddIngredient} setIsAddIngredient={setIsAddIngredient} setInputRecipe={setInputRecipe} />}

            <div className='single_line'></div>

            {inputRecipe.ingredients.length > 0 && <DisplayIngredients ingredients={inputRecipe.ingredients} setInputRecipe={setInputRecipe} />}

            <Button type='submit' variant="contained" color="success">Add Recipe</Button>
        </Box>
    )
}

export default RecipeForm