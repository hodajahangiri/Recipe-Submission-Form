import { useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

function IngredientForm({ isAddIngredient }) {

    const [inputIngredient, setInputIngredient] = useState({
        name: "",
        quantity: 0.1,
        unit: "cups"
    });

    const [errors, setErrors] = useState({
        name: "",
        quantity: ""
    });

    const validateField = (id, value) => {
        const floatValue = parseFloat(value);
        console.log("floatValue", floatValue);
        // const floatRegex = /^-?\d+\.\d+$/;
        const floatRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;

        console.log(floatRegex.test(value))

        switch (id) {
            case "name":
                return (isAddIngredient && value.length >= 2 && value.length <= 50) ? "" : "Must have 10-500 characters";
            case "quantity":
                return (floatValue && isAddIngredient && floatRegex.test(value) && floatValue >= 0.1 && floatValue <= 1000) ? "" : "Must be a float between 0.1-1000";
        }
    };

    const handleChangeUnit = (event) => {
        setInputIngredient(prevData => ({ ...prevData, ["unit"]: event.target.value }));
    }

    const handleBlur = (event) => {
        const { id, value } = event.target;
        // Optional: Format the value when the user leaves the field
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
            setInputIngredient(prevData => ({ ...prevData, [id]: floatValue.toFixed(2) })); // Rounds to 2 decimal places
        } else if (value !== '') {
            setInputIngredient(prevData => ({ ...prevData, [id]: '' })); // Clear if not a valid number
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target; // Grabbing the id and value properties from the input element
        console.log(id, value);
        console.log(`id: ${id}, value: ${value}`);
        setInputIngredient(prevData => ({ ...prevData, [id]: value })); //Creating a new object, spreading old object, updating the value of the key that we are changing
        // real time validation of field information (call validateField)
        const error = validateField(id, value);
        setErrors(prevData => ({ ...prevData, [id]: error }));
    };


    const handleAddIngredient = (event) => {
        event.preventDefault();
        console.log("ADD Clicked");

    }


    return (
        <>
            <h3>Add Ingredient: </h3>
            <div className='ingredient_form'>
                <section>
                    <TextField
                        id="name"
                        label="Name: Required "
                        placeholder='2-50 characters'
                        variant="outlined"
                        required
                        type='text'
                        fullWidth
                        value={inputIngredient.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p style={{ color: "red" }}> {errors.name}</p>}
                </section>
                <section>
                    <TextField
                        id="quantity"
                        label="Quantity(numeric, 0.1-1000): Required"
                        placeholder='0.1-1000'
                        variant="outlined"
                        required
                        type='text'
                        fullWidth
                        value={inputIngredient.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.quantity && <p style={{ color: "red" }}> {errors.quantity}</p>}
                </section>
                <section>
                    <TextField
                        id='unit'
                        select
                        label="Unit: Required"
                        value={inputIngredient.unit}
                        onChange={handleChangeUnit}
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
                </section>
                <section>
                    <Button onClick={handleAddIngredient} variant="contained">Add</Button>
                </section>
            </div>
        </>
    )
}

export default IngredientForm