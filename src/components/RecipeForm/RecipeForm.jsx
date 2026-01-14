import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import "./RecipeForm.css"

function RecipeForm() {

    const [addIngredient, setAddIngredient] = useState(false);

    const [value, setValue] = useState(5);
    const [difficulty, setDifficulty] = useState("Easy");
    const [category, setCategory] = useState("Appetizer");
    const [cuisineType, setCuisineType] = useState("American");

    const handleChange = (event) => {
        let inputValue = parseInt(event.target.value, 10);

        // Manually clamp the value within the allowed range on change
        if (!isNaN(inputValue)) {
            if (inputValue > 20) inputValue = 20;
            if (inputValue < 0) inputValue = 0;
            setValue(inputValue);
        } else {
            setValue(''); // Handle non-numeric input if needed
        }
    };

    const handleChangeDifficulty = (event) => {
        setDifficulty(event.target.value)
    }

    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }

    const handleChangeCuisineType = (event) => {
        setCuisineType(event.target.value)
    }



    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
            autoComplete="off"
            onSubmit={""}
        >
            <h1>Recipe Form</h1>
            <TextField
                id="recipe_title"
                label="Recipe Title: Required "
                placeholder='3-50 characters'
                variant="outlined"
                required
                type='text' />
            <TextField
                id="description"
                label="Description: Required"
                placeholder='10-500 characters'
                variant="outlined"
                required
                type='text' />
            <TextField
                id="servings"
                label="Servings(numeric, 1-20): Required"
                variant="outlined"
                required
                type='number'
                value={value}
                onChange={handleChange}
            />
            <TextField
                id="difficulty"
                select
                label="Difficulty Level: Required"
                value={difficulty}
                onChange={handleChangeDifficulty}
                fullWidth
                required
            >
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
            </TextField>
            <TextField
                id='category'
                select
                label="Category: Required"
                value={category}
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
                label="Category: Required"
                value={cuisineType}
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
            <h3>Add Ingredient: </h3>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
                autoComplete="off"
                onSubmit={""}
            >
                <div className='ingredient_form'>
                    <TextField
                        id="name"
                        label="Name: Required "
                        placeholder='2-50 characters'
                        variant="outlined"
                        required
                        type='text'
                        fullWidth
                    />
                    <TextField
                        id="quantity"
                        label="Quantity(numeric, 0.1-1000): Required"
                        placeholder='0.1-1000'
                        variant="outlined"
                        required
                        type='digit'
                        fullWidth
                    />
                    <TextField
                        id='unit'
                        select
                        label="Unit: Required"
                        value={""}
                        onChange={""}
                        required
                        fullWidth
                    >
                        <MenuItem value="cups">cups</MenuItem>
                        <MenuItem value="tablespoons">tablespoons</MenuItem>
                        <MenuItem value="teaspoons">teaspoons</MenuItem>
                        <MenuItem value="ounces">ounces</MenuItem>
                        <MenuItem value="pounds">pounds</MenuItem>
                        <MenuItem value="grams">grams</MenuItem>
                        <MenuItem value="pieces">pieces</MenuItem>
                    </TextField>
                    <Button variant="contained">Add</Button>
                </div>
            </Box>
            <Button variant="contained" color="success">Add Recipe</Button>
        </Box>
    )
}

export default RecipeForm