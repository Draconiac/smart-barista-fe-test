import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import dotsReducer from '../features/dots/dotsSlice'
import modalReducer from '../features/modalSlice'

export const store = configureStore({
  reducer: {
    //tests
    posts: postsReducer,
    dots : dotsReducer,
    //real
    modal: modalReducer,
  }
})


export type AppStore = typeof store // Infer the type of `store`
export type AppDispatch = typeof store.dispatch // Infer the `AppDispatch` type from the store itself
export type RootState = ReturnType<typeof store.getState> // Same for the `RootState` type