import {  Box, Button, Card, CardActions, CardContent, CircularProgress, FormControl, FormControlLabel, FormLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setServicesFilterId, setServicesFilterName, setServicesFilterKeyword, setServicesFilterBy } from '../../slices/filtersslice';



function ServicesTab(props) {
    const serviceFilters = useSelector(state => state.filters.services);
    const dispatch = useDispatch();
    const things = useSelector(state => state.things.things);
    const thingsStatus = useSelector(state => state.things.status);
    const error = useSelector(state => state.things.error);
    const filterBy = useSelector(state => state.filters.services.filterBy);

  let content

  if (thingsStatus === 'loading') {
    content = <CircularProgress />
  } else if (thingsStatus === 'succeeded') {

    content = <Box
    mb={2}
    display="flex"
    flexDirection="column"
    height="300px" // fixed the height
    style={{
      overflow: "hidden",
      overflowY: "scroll" // added scroll
    }}
  >
    {things.map((thing) => {
      return (
        <div>
        <Paper >Services Available for Thing ID: {thing.thingId}</Paper>
        {thing.services.map((service)=> {
          return (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} >
                  {service.name}
                </Typography>
                <Typography>
                  Belongs to Thing ID: {service.thingId}
                  Belongs to Entitiy: {service.entityId}
                </Typography>
                <Typography>
                  {service.keywords}
                </Typography>
                <Typography>
                  API: {service.API}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
        </div>
      );
            })}
    </Box>

  } else if (thingsStatus === 'failed') {
    content = <div>{error}</div>
  }

    return (
      <div>
        <Paper className='Form'>
            <p className='Grid-label'>Services...</p>
            
            <TextField select
                id="thing-id-filter"
                value={serviceFilters.Id}
                label="Filter by Thing ID"
                onChange={(e) => dispatch(setServicesFilterId(e.target.value))}
                defaultValue=''
            >
                {things.map(thing => <MenuItem key={thing.thingId} value={thing.thingId}>{thing.thingId}</MenuItem>)}
    
            </TextField>
            <TextField id="serv-name" label="Service Name" variant="outlined" onChange={(e) => dispatch(setServicesFilterName(e.target.value))}/>
            <TextField id="serv-kw" label="Service Keyword" variant="outlined" onChange={(e) => dispatch(setServicesFilterKeyword(e.target.value))} />
            <div>
            <FormControl>
              <FormLabel id="filter-by-label" className='Form'>Filter By</FormLabel>
              <RadioGroup
                row
                aria-labelledby="filter-by-label"
                defaultValue=""
                value={filterBy}
                onChange={(e) => dispatch(setServicesFilterBy(e.target.value))}
                name="filter-by-radio"
              >
                <FormControlLabel value="" control={<Radio />} label="None" />
                <FormControlLabel value="id" control={<Radio />} label="ID" />
                <FormControlLabel value="name" control={<Radio />} label="Name" />
                <FormControlLabel value="keyword" control={<Radio />} label="Keyword" />
              </RadioGroup>
            </FormControl>
            </div>
        
        </Paper>
        
        {content}
        
      </div>
    );
  }
  
  export default ServicesTab;