import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    services : {
        id : '',
        name : '',
        keyword : '',
        filterBy : '',
    },
    relationships : {
        id : '',
        name : '',
        keyword : '',
        filterBy : '', 
    }
  },
  reducers: {
    setServicesFilterId : (state, action) => {
        state.services.id = action.payload
    },
    setServicesFilterName : (state, action) => {
      state.services.name = action.payload;
    },
    setServicesFilterKeyword : (state, action) => {
      state.services.keyword = action.payload;
    },
    setServicesFilterBy : (state, action) => {
        state.services.filterBy = action.payload
    },
    setRelationshipsFilterId : (state, action) => {
      state.relationships.id = action.payload;
    },
    setRelationshipsFilterName : (state, action) => {
      state.relationships.name = action.payload;
    },
    setRelationshipsFilterKeyword : (state, action) => {
      state.relationships.keyword = action.payload;
    },
    setRelationshipsFilterBy : (state, action) => {
        state.relationships.filterBy = action.payload
    },
  }
})

export const { setRelationshipsFilterId, setRelationshipsFilterName, setRelationshipsFilterKeyword, setServicesFilterId, setServicesFilterKeyword, setServicesFilterName, setRelationshipsFilterBy, setServicesFilterBy } = filtersSlice.actions

export default filtersSlice.reducer

