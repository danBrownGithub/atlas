import { Box, Card, CardContent, CircularProgress, FormControl, FormControlLabel, FormLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRelationshipsFilterId, setRelationshipsFilterName, setRelationshipsFilterKeyword, setRelationshipsFilterBy } from '../../slices/filtersslice';

function RelationsTab(props) {
    const things = useSelector(state => state.things.things);
    const relationshipFilters = useSelector(state => state.filters.relationships);
    const dispatch = useDispatch();
    const thingsStatus = useSelector(state => state.things.status);
    const error = useSelector(state => state.things.error);
    const filterBy = useSelector(state => state.filters.relationships.filterBy);

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
        <Paper >Relationships</Paper>
        {thing.relationships.map((relationship)=> {
          return (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} >
                  {relationship.name}
                </Typography>
                <Typography>
                  Belongs to Thing ID: {relationship.thingId}
                </Typography>
                <Typography>
                  Category: {relationship.category}
                </Typography>
                <Typography>
                  {relationship.serviceA} {relationship.type} {relationship.serviceB}
                </Typography>
                <Typography>
                  {relationship.keywords}
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
            <p className='Grid-label'>Relationships...</p>
    
            <TextField select

                labelId="thing-id-label"
                id="thing-id-filter"
                value={relationshipFilters.Id}
                label="Thing ID"
                onChange={(e) => dispatch(setRelationshipsFilterId(e.target.value))}
                defaultValue=''
            >
                {things.map(thing => <MenuItem key={thing.thingId} value={thing.thingId}>{thing.thingId}</MenuItem>)}

            </TextField>
            <TextField id="rel-name" label="Relationship Name" variant="outlined" className='Filter' onChange={(e) => dispatch(setRelationshipsFilterName(e.target.value))}/>
            <TextField id="rel-kw" label="Relationship Keyword" variant="outlined" className='Filter' onChange={(e) => dispatch(setRelationshipsFilterKeyword(e.target.value))}/>

            <div>
            <FormControl>
              <FormLabel id="filter-by-label" className='Form'>Filter By</FormLabel>
              <RadioGroup
                row
                aria-labelledby="filter-by-label"
                defaultValue=""
                value={filterBy}
                onChange={(e) => dispatch(setRelationshipsFilterBy(e.target.value))}
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
  
  export default RelationsTab;