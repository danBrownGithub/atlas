import {  Button, MenuItem, Paper, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function AppManager(props) {
    
    const dispatch = useDispatch();

    return (
      <div>
        <Paper>
            App Manager
        </Paper>

        <Button variant='contained'>
            Save
        </Button>

        <Button variant='contained'>
            Upload
        </Button>

        <Button variant='contained'>
            Activate
        </Button>

        <Button variant='contained'> 
            Stop
        </Button>

        <Button variant='contained'> 
            Delete
        </Button>
        
      </div>
    );
  }
  
  export default AppManager;