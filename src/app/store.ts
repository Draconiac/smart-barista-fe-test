import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import testReducer from '../features/testSlice'
import modalReducer from '../features/modalSlice'
import tableReducer from '../features/tableSlice'

export const store = configureStore({
  reducer: {
    //tests
    posts: postsReducer,
    test : testReducer,
    //real
    modal: modalReducer,
    table: tableReducer,
  }
})


export type AppStore = typeof store // Infer the type of `store`
export type AppDispatch = typeof store.dispatch // Infer the `AppDispatch` type from the store itself
export type RootState = ReturnType<typeof store.getState> // Same for the `RootState` type