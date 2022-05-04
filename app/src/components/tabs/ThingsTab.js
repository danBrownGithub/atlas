import { CircularProgress, List, Paper } from '@mui/material';
import ThingsDisplay from '../ThingDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchThings } from '../../slices/thingslice';



function ThingsTab(props) {

    const things = useSelector(state => state.things.things);
    const thingsStatus = useSelector(state => state.things.status)
    const error = useSelector(state => state.things.error)
    const dispatch = useDispatch();

  useEffect(() => {
    if (thingsStatus === 'idle') {
      dispatch(fetchThings())
    }
  }, [thingsStatus, dispatch])

  let content

  if (thingsStatus === 'loading') {
    content = <CircularProgress />
  } else if (thingsStatus === 'succeeded') {

    content = things.map(thing => <ThingsDisplay key={thing.thingId} thingId={thing.thingId} thingIp={thing.thingIp}></ThingsDisplay>)

  } else if (thingsStatus === 'failed') {
    content = <div>{error}</div>
  }

    return (
      <div>
        <Paper>
            <p className='Grid-label'>Things...</p>
            <p className='Grid-label'> Things Detected: {things.length}</p>
        </Paper>

        <div>
          {content}
        </div>
        
      </div>
    );
  }
  
  export default ThingsTab;