import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

export const thingsSlice = createSlice({
  name: 'things',
  initialState: {
    things : [],
    status : 'idle',
    error : '',
  },
  reducers: {
    addThing: (state, action) => {
        return {
            ...state,
            things : [...state.things, action.payload ]
        };
    },
    removeThing: (state, action) => {
      state.things.filter(element => element !== action.payload)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchThings.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchThings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.things = state.things.concat(action.payload.things)
      })
      .addCase(fetchThings.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const fetchThings = createAsyncThunk('things/fetchThings', async () => {
  const response = await fetch('http://10.20.0.174:8080/', {
                                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                                        mode: 'cors', // no-cors, *cors, same-origin
                                      });
  return response.json(); // parses JSON response into native JavaScript
})

export const { addThing, removeThing } = thingsSlice.actions

export default thingsSlice.reducer