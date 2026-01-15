import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function DisplayRecipes({ recipes }) {
  return (
    // Show Recipes In cards
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {recipes.map((recipe, index) => (
        <Card key={index}>
          <CardActionArea
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={recipe.image_url}
              alt={recipe.recipe_title}
            />
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {recipe.recipe_title}
              </Typography>
              <div className='single_line'></div>
              <Typography variant="body2" color="text.secondary">
                {recipe.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Servings: {recipe.servings} - Difficulty Level: {recipe.difficulty_level}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                category: {recipe.category} - Cuisine Type: {recipe.cuisine_type}
              </Typography>
              <div className='single_line'></div>
              {recipe.ingredients.length > 0 && (
                <ul>
                  <p>Ingredients:</p>
                  {
                    recipe.ingredients.map((ingredient,idx) => (
                      <li key={idx}>
                        {ingredient.name} : {ingredient.quantity} {ingredient.unit}
                      </li>
                    ))
                  }
                </ul>
              )
              }
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  )
}






export default DisplayRecipes