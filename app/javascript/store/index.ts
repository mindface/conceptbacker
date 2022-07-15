import { combineReducers, createStore } from 'redux'
import { rootReducer } from './modules/reducer'
import { initStore } from './modules/index'

const combinedReducer = combineReducers({
  base: rootReducer,
})

export const setupStore = initStore //createStore(combinedReducer)

export type AppDispatch = typeof setupStore.dispatch
