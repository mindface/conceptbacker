import { combineReducers } from 'redux'
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from 'react-redux'
import * as post from './data_action/post'
import * as modal from './data_action/modal'
import * as imager from './data_action/imager'
import * as movier from './data_action/movier'
import * as dictio from './data_action/dictio'
import * as PostsModels from '../../type/post'
import * as ModalModels from '../../type/modal'
import * as ImagerModels from '../../type/imager'
import * as MovierModels from '../../type/movier'
import * as DictioModels from '../../type/dictio'
// import * as CardModels from '../../models/card'

export interface RootStore {
  post: PostsModels.initalPostState
  modal: ModalModels.Modals
  imager: ImagerModels.InitalImagerState
  movier: MovierModels.InitalMovierState
  dictio: DictioModels.initalDictioState
}

const reducers = combineReducers({
  post: post.postReducer,
  modal: modal.modalReducer,
  imager: imager.imagerReducer,
  movier: movier.movierReducer,
  dictio: dictio.dictioReducer,
})

export const rootReducer = (state: RootStore | undefined, action: any) => {
  if (action?.type === '') {
    state = undefined
  }
  return reducers(state, action)
}

export const useRootSelector: TypedUseSelectorHook<RootStore> = rawUseSelector
