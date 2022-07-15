import { Action, Dispatch } from 'redux'
import { Imageis, Imager, InitalImagerState } from '../../../type/imager'
import { setParams } from './_params'
import { AppDispatch } from '../../index'

export function initalImagerState(): InitalImagerState {
  return {
    items: [],
    modalView: false,
  }
}

export interface ImagerAction extends Action {
  type: string
  items: Imager[]
  itemInfo?: Imager
}

export interface ImagerActionFailure extends Action {
  type: string
  err: string | unknown
}

export function imagerReducer(
  state: any = initalImagerState(),
  action: ImagerAction
) {
  switch (action.type) {
    case 'imager/request':
      return {
        ...state,
        isFetching: true,
        items: [],
      }
    case 'imager/success':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'imager/failure':
      return {
        ...state,
        isFetching: false,
        items: [],
      }
    case 'imager/setImager':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'imager/setUserLevel':
      return {
        ...state,
        items: action['items'],
      }
    default:
      return state
  }
}

export const ImagerFetchDataRequest = (): ImagerAction => {
  return {
    type: 'imager/request',
    items: [],
  }
}

export const ImagerFetchDataSuccess = (data: Imager[]): ImagerAction => {
  return {
    type: 'imager/success',
    items: data,
  }
}

export const ImagerFetchDataFailure = (
  err: string | unknown
): ImagerActionFailure => {
  return {
    type: 'imager/failure',
    err: err,
  }
}

export const getImagerData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(ImagerFetchDataRequest())
    try {
      const param = setParams('GET')
      const response: any = await fetch(`/api/imarings`, param)
      const data = await response.json()
      dispatch(ImagerFetchDataSuccess(data))
    } catch (error) {
      console.log(error)
      dispatch(ImagerFetchDataFailure(error!))
    }
  }
}

export const addImagerData = (sendData: FormData) => {
  return async (dispatch: Dispatch) => {
    dispatch(ImagerFetchDataRequest())
    try {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/imarings', true)
      xhr.send(sendData)
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response)
        dispatch(ImagerFetchDataSuccess(xhr.response))
      }
    } catch (error) {
      console.log(error)
      dispatch(ImagerFetchDataFailure(error!))
    }
  }
}

export const deleteImagerData = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(ImagerFetchDataRequest())
    try {
      const param = setParams('DELETE')
      param.body = JSON.stringify({ id: id })
      const response: any = await fetch(`/api/imarings/${id}`, param)
      const data = await response.json()
      dispatch(getImagerData())
    } catch (error) {
      console.log(error)
      dispatch(ImagerFetchDataFailure(error!))
    }
  }
}
