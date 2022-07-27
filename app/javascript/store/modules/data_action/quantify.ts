import { Action, Dispatch } from 'redux'
import { Quantify, Quantifies, initalQuantifyState } from '../../../type/quantify'
import { setParams } from './_params'

import { AppDispatch } from '../../index'

export function initalQuantifyState(): initalQuantifyState {
  return {
    items: [],
    item: {
      title: "",
      user_id: "",
      disc: "",
      leveliseNum: "",
      goalNum: "",
      rateNum: 0,
      id: 0
    }
  }
}

export interface QuantifyAction extends Action {
  type: string
  items: Quantifies
  item?: Quantify
}

export interface QuantifyActionFailure extends Action {
  type: string
  err: string
}

export function quantifyReducer(
  state: any = initalQuantifyState(),
  action: QuantifyAction
) {
  switch (action.type) {
    case 'quantify/request':
      return {
        ...state,
        isFetching: true,
        items: [],
      }
    case 'quantify/success':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'quantify/failure':
      return {
        ...state,
        isFetching: false,
        items: [],
      }
    case 'quantify/setList':
      return {
        ...state,
        isFetching: false,
        items: action['items'],
      }
    case 'quantify/set':
      return {
        ...state,
        isFetching: false,
        item: action['item'],
      }
    default:
      return state
  }
}

export const quantifyFetchDataRequest = (): QuantifyAction => {
  return {
    type: 'quantify/request',
    items: [],
  }
}

export const quantifyFetchDataSuccess = (data: Quantifies): QuantifyAction => {
  return {
    type: 'quantify/success',
    items: data,
  }
}

export const quantifyFetchDataFailure = (err: string): QuantifyActionFailure => {
  return {
    type: 'quantify/failure',
    err: err,
  }
}

export const GetQuantifyData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(quantifyFetchDataRequest())
    const param = setParams('GET')
    const response: any = await fetch(`/api/quantifies`, param)
    const data = await response.json()
    dispatch(quantifyFetchDataSuccess(data))
  }
}

export const UpdateQuantifyData = (sendData: Quantify) => {
  return async (dispatch: AppDispatch) => {
    dispatch(quantifyFetchDataRequest())
    try {
      const param = setParams('PATCH')
      param.body = JSON.stringify({ quantify: sendData })
      const response: any = await fetch(`/api/quantifies/${sendData.id}`, param)
      const data = await response.json()
      dispatch(GetQuantifyData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(quantifyFetchDataFailure(err))
      }
    }
  }
}

export const AddQuantifyData = (sendData: Quantify) => {
  return async (dispatch: AppDispatch) => {
    dispatch(quantifyFetchDataRequest())
    try {
      const param = setParams('POST')
      console.log(sendData)
      param.body = JSON.stringify({ quantify: sendData })
      const response: any = await fetch(`/api/quantifies`, param)
      const data = await response.json()
      dispatch(GetQuantifyData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(quantifyFetchDataFailure(err))
      }
    }
  }
}

export const DeleteQuantifyData = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const params = setParams('DELETE')
      params.body = JSON.stringify({ id: id })
      const res = await fetch(`/api/quantifies/${id}`, params)
      const result = await res.json()
      console.log(result)
      dispatch(GetQuantifyData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(quantifyFetchDataFailure(err))
      }
    }
  }
}
