import {  MenuItem, Paper, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setServicesFilterId, setServicesFilterName, setServicesFilterKeyword } from '../../slices/filtersslice';

console.log(setServicesFilterId(1));

function AppsTab(props) {
   
    const dispatch = useDispatch();

    return (
      <div>
        <Paper>
            Apps Tab
        </Paper>
        
        
      </div>
    );
  }
  
  export default AppsTab;