import { Action } from 'redux'

export interface ModalAction extends Action {
  type: string
  modalView: boolean
  viewId: number
  selectId: number
  canvasElement: HTMLCanvasElement
}

export interface ModalActionFailure extends Action {
  type: string
  err: string
  id: string
}

export function initalCardState(): any {
  return {
    modalView: false,
    viewId: 0,
    selectId: 1,
    isFetching: false,
    isloading: false,
    canvasElement: '',
  }
}

export function modalReducer(
  state: any = initalCardState(),
  action: ModalAction
) {
  switch (action.type) {
    case 'modal/open':
      return {
        ...state,
        modalView: true,
        viewId: action.viewId,
      }
    case 'modal/close':
      return {
        ...state,
        modalView: false,
      }
    case 'modal/dataget':
      return {
        ...state,
        isFetching: false,
      }
    case 'modal/selectId':
      return {
        ...state,
        selectId: action.selectId,
      }
    case 'modal/setCanvas':
      return {
        ...state,
        canvasElement: action.canvasElement,
      }
    //  case 'level/datadelete':
    //    axios.delete(`http://localhost:3003/api/levels/${action['id']}`)
    //    .then( (res) => {
    //      return {
    //        ...state,
    //          isFetching: true,
    //        }
    //    })
    // return {
    // ...state,
    //   isFetching: true
    // }
    default:
      return state
  }
}
