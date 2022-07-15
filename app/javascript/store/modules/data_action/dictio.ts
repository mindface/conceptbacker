import { Action, Dispatch } from 'redux'
import { Dictio, Dictios } from '../../../type/dictio'
import { setParams } from './_params'

import { AppDispatch } from '../../index'

type DictioState = {
  items: Dictios
  modalView: boolean
}

export function initalDictioState(): DictioState {
  return {
    items: [],
    modalView: false,
  }
}

export interface DictioAction extends Action {
  type: string
  items: Dictios
}

export interface DictioActionFailure extends Action {
  type: string
  err: string
}

export function dictioReducer(
  state: any = initalDictioState(),
  action: DictioAction
) {
  switch (action.type) {
    case 'dictio/request':
      return {
        ...state,
        isFetching: true,
        items: [],
      }
    case 'dictio/success':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'dictio/failure':
      return {
        ...state,
        isFetching: false,
        items: [],
      }
    default:
      return state
  }
}

export const dictioFetchDataRequest = (): DictioAction => {
  return {
    type: 'dictio/request',
    items: [],
  }
}

export const dictioFetchDataSuccess = (data: Dictios): DictioAction => {
  return {
    type: 'dictio/success',
    items: data,
  }
}

export const dictioFetchDataFailure = (err: string): DictioActionFailure => {
  return {
    type: 'dictio/failure',
    err: err,
  }
}

export const getDictioData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(dictioFetchDataRequest())
    const param = setParams('GET')
    const response: any = await fetch(`/api/dictios`, param)
    const data = await response.json()
    dispatch(dictioFetchDataSuccess(data))
  }
}

export const UpdateDictioData = (sendData: Dictio) => {
  return async (dispatch: AppDispatch) => {
    dispatch(dictioFetchDataRequest())
    try {
      const param = setParams('PATCH')
      param.body = JSON.stringify({ dictio: sendData })
      const response: any = await fetch(`/api/dictios/${sendData.id}`, param)
      const data = await response.json()
      dispatch(getDictioData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(dictioFetchDataFailure(err))
      }
    }
  }
}

export const AddDictioData = (sendData: Dictio) => {
  return async (dispatch: AppDispatch) => {
    dispatch(dictioFetchDataRequest())
    try {
      const param = setParams('POST')
      param.body = JSON.stringify({ dictio: sendData })
      const response: any = await fetch(`/api/dictios`, param)
      const data = await response.json()
      dispatch(getDictioData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(dictioFetchDataFailure(err))
      }
    }
  }
}

export const DeletePostData = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const params = setParams('DELETE')
      params.body = JSON.stringify({ id: id })
      const res = await fetch(`/api/dictios/${id}`, params)
      const result = await res.json()
      dispatch(getDictioData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(dictioFetchDataFailure(err))
      }
    }
  }
}
