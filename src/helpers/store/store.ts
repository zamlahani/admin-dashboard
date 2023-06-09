import { configureStore } from '@reduxjs/toolkit'
import financialReducer from "./financial"
import financialTable from "./financialTable"
// ...

const store = configureStore({
  reducer: {
    financial: financialReducer,
    financialTable: financialTable
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch