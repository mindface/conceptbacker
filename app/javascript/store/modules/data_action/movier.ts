import { Action, Dispatch } from 'redux'
import { Movier, InitalMovierState } from '../../../type/movier'
import { setParams } from './_params'
import { AppDispatch } from '../../index'

export function initalMovierState(): InitalMovierState {
  return {
    items: [],
    modalView: false,
  }
}

export interface MovierAction extends Action {
  type: string
  items: Movier[]
  itemInfo?: Movier
}

export interface MovierActionFailure extends Action {
  type: string
  err: string | unknown
}

export function movierReducer(
  state: any = initalMovierState(),
  action: MovierAction
) {
  switch (action.type) {
    case 'movier/request':
      return {
        ...state,
        isFetching: true,
        items: [],
      }
    case 'movier/success':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'movier/failure':
      return {
        ...state,
        isFetching: false,
        items: [],
      }
    case 'movier/setMovier':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'movier/setUserLevel':
      return {
        ...state,
        items: action['items'],
      }
    default:
      return state
  }
}

export const movierFetchDataRequest = (): MovierAction => {
  return {
    type: 'movier/request',
    items: [],
  }
}

export const movierFetchDataSuccess = (data: Movier[]): MovierAction => {
  return {
    type: 'movier/success',
    items: data,
  }
}

export const movierFetchDataFailure = (
  err: string | unknown
): MovierActionFailure => {
  return {
    type: 'movier/failure',
    err: err,
  }
}

export const getMovieData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(movierFetchDataRequest())
    try {
      const param = setParams('GET')
      const response: any = await fetch(`/api/videos`, param)
      const data = await response.json()
      dispatch(movierFetchDataSuccess(data))
    } catch (error) {
      console.log(error)
      dispatch(movierFetchDataFailure(error!))
    }
  }
}

export const addMovieData = (sendData: FormData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(movierFetchDataRequest())
    try {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/videos', true)
      xhr.onload = () => {
        dispatch(getMovieData())
      }
      xhr.send(sendData)

      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response)
      }
    } catch (error) {
      console.log(error)
      dispatch(movierFetchDataFailure(error!))
    }
  }
}

export const deleteImagerData = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(movierFetchDataRequest())
    try {
      const param = setParams('DELETE')
      param.body = JSON.stringify({ id: id })
      const response: any = await fetch(`/api/videos/${id}`, param)
      const data = await response.json()
      dispatch(getMovieData())
    } catch (error) {
      console.log(error)
      dispatch(movierFetchDataFailure(error!))
    }
  }
}
