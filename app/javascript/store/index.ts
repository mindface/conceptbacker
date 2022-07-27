import { initStore } from './modules/index'

export const setupStore = initStore //createStore(combinedReducer)

export type AppDispatch = typeof setupStore.dispatch
