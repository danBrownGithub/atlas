import { configureStore } from '@reduxjs/toolkit'
import thingsReducer from './slices/thingslice'
import filtersReducer from './slices/filtersslice'

export const store = configureStore({
  reducer: {
    things : thingsReducer,
    filters : filtersReducer
  }
})