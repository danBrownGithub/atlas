import { createSlice } from '@reduxjs/toolkit'

export const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    apps : [
        {
            name : '',
            src : '',
            
        }
    ],
    workingDir : '',
    devMode : false,
  },
  reducers: {
    addApp: (state, action) => {
        return {
            ...state,
            apps : [...state.apps, action.payload ]
        };
    },
    removeApp: (state, action) => {
      state.apps.filter(element => element !== action.payload)
    },
  }
})

export const { addApp, removeApp } = appsSlice.actions

export default appsSlice.reducer