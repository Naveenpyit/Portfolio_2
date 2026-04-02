import { configureStore } from '@reduxjs/toolkit'
import contactReducer from '../features/contactSlice'
import uiReducer from '../features/uiSlice'

export const store = configureStore({
  reducer: { ui: uiReducer, contact: contactReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
