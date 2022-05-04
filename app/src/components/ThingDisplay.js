import { ListItem, ListItemText } from '@mui/material';

function ThingsDisplay(props) {
    return (
      <div>
        <ListItem disablePadding>
            <ListItemText >ID: {props.thingId}</ListItemText>
            <ListItemText >IP: {props.thingIp}</ListItemText>
        </ListItem>
      </div>
    );
  }
  
  export default ThingsDisplay;