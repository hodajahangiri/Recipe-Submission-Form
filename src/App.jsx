import "./App.css";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import DisplayRecipes from "./components/DisplayRecipes/DisplayRecipes";

function App() {

  return (
    <div className="container">
      <RecipeForm/>
      <DisplayRecipes/>
    </div>
  )
}

export default App
