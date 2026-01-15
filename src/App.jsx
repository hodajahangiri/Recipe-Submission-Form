import "./App.css";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import DisplayRecipes from "./components/DisplayRecipes/DisplayRecipes";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { useState } from "react";

function App() {

  const [tab, setTab] = useState('1');
  const [recipes, setRecipes] = useState([]);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <div className="container">
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Add Recipe" value="1" />
            <Tab label="Recipes" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><RecipeForm setRecipes={setRecipes} setTab={setTab}/></TabPanel>
        <TabPanel value="2"><DisplayRecipes recipes={recipes}/></TabPanel>
      </TabContext>
    </div>
  )
}

export default App
