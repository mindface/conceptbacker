import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { rootReducer } from './reducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const initStore = createStore(rootReducer, composedEnhancer)
