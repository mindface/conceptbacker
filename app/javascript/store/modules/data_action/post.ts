import { Action, Dispatch } from 'redux'
import { Post, Posts } from '../../../type/post'
import { setParams } from './_params'

import { AppDispatch } from '../../index'

type PostState = {
  postDataItem: Posts
  modalView: boolean
}

export function initalPostState(): PostState {
  return {
    postDataItem: [],
    modalView: false,
  }
}

export interface PostAction extends Action {
  type: string
  items: Posts
}

export interface PostActionFailure extends Action {
  type: string
  err: string
}

export function postReducer(
  state: any = initalPostState(),
  action: PostAction
) {
  switch (action.type) {
    case 'post/request':
      return {
        ...state,
        isFetching: true,
        postDataItem: [],
      }
    case 'post/success':
      return {
        ...state,
        isFetching: false,
        postDataItem: action['items'],
      }
    case 'post/failure':
      return {
        ...state,
        isFetching: false,
        postDataItem: [],
      }
    default:
      return state
  }
}

export const postFetchDataRequest = (): PostAction => {
  return {
    type: 'post/request',
    items: [],
  }
}

export const postFetchDataSuccess = (data: Posts): PostAction => {
  return {
    type: 'post/success',
    items: data,
  }
}

export const postFetchDataFailure = (err: string): PostActionFailure => {
  return {
    type: 'post/failure',
    err: err,
  }
}

export const getPostData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(postFetchDataRequest())
    const param = setParams('GET')
    const response: any = await fetch(`/homes_allinfo`, param)
    const data = await response.json()
    dispatch(postFetchDataSuccess(data))
  }
}

export const UpdatePostData = (sendData: Post) => {
  return async (dispatch: AppDispatch) => {
    try {
      const param = setParams('PATCH')
      param.body = JSON.stringify({ home: sendData })
      const response: any = await fetch(`/api/homes/${sendData.id}`, param)
      const data = await response.json()
      dispatch(getPostData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(postFetchDataFailure(err))
      }
    }
  }
}

export const AddPostData = (sendData: Post) => {
  return async (dispatch: AppDispatch) => {
    try {
      const param = setParams('POST')
      param.body = JSON.stringify({ home: sendData })
      const response: any = await fetch(`/api/homes`, param)
      const data = await response.json()
      dispatch(getPostData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(postFetchDataFailure(err))
      }
    }
  }
}

export const DeletePostData = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const params = setParams('DELETE')
      params.body = JSON.stringify({ id: id })
      const res = await fetch(`/api/homes/${id}`, params)
      const result = await res.json()
      dispatch(getPostData())
    } catch (err) {
      console.log('err | ', err)
      if (typeof err === 'string') {
        dispatch(postFetchDataFailure(err))
      }
    }
  }
}
