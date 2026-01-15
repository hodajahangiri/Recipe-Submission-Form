import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

function DisplayIngredients({ ingredients , setInputRecipe }) {

    const handleDeleteIngredient = (idx) => {
        // Delete Ingredient from Input Recipe
        setInputRecipe(prevData => ({ ...prevData, ["ingredients"]: [...prevData["ingredients"].filter((item, index) => index !== idx)]}));
    };
    return (
        <>
            {ingredients.length > 0 &&
                ingredients.map((ingredient, idx) => (
                    <ListItem
                        key={idx}>
                        <ListItemText primary={ingredient.name} />
                        <ListItemText primary={`: ${ingredient.quantity} ${ingredient.unit} `} />
                        <Button
                            onClick={() => handleDeleteIngredient(idx)}
                            variant="contained"
                            color="error">
                            Delete
                        </Button>
                    </ListItem>
                ))
            }
        </>
    );
};

export default DisplayIngredients