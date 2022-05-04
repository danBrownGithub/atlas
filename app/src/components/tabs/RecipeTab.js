import {  Button, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';;

function RecipesTab(props) {
   
    const dispatch = useDispatch();

    return (
      <div>
        <Paper className='Form'>
            <p>Recipes Tab</p>
            <Button variant='contained'>Clear</Button>
            <Button variant='contained'>Finalize</Button>
        </Paper>
        <TextField></TextField>
        
        
      </div>
    );
  }
  
  export default RecipesTab;