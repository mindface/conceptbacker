// import { Action, Dispatch } from 'redux'
// import { Card } from '../../../models/card'

// export interface CardAction extends Action {
//   type: string
//   cards: Card[]
//   setCard: Card | object
//   card: Card
//   setId?: string
//   setCotentId: number
//   deleteId: string
// }

// export interface CardState {
//   type: string
//   cards: Card[]
//   card: Card | object
//   setId: string
//   setCotentId: number
//   deleteId: string
// }

// export function initalCardState(): CardState {
//   return {
//     type: '',
//     cards: [
//       {
//         id: 1,
//         path: 'images/item1.png',
//         name: 'title',
//         x: 0,
//         y: 0,
//         content: 'tetetetet',
//         contentId: '1',
//       },
//       {
//         id: 2,
//         path: 'images/item1.png',
//         name: 'title',
//         x: 0,
//         y: 0,
//         content: 'tetetetet',
//         contentId: '2',
//       },
//     ],
//     card: {},
//     setId: '0',
//     setCotentId: 0,
//     deleteId: '0',
//   }
// }

// export function cardReducer(
//   state: any = initalCardState(),
//   action: CardAction
// ) {
//   switch (action.type) {
//     case 'card/add':
//       return {
//         ...state,
//         cardView: true,
//         cards: action.cards,
//       }
//     case 'card/update':
//       const card = action.card
//       const list = state.cards.map((item: Card) => {
//         if (item.id === action.card.id)
//           return { ...item, name: card.name, content: card.content }
//         return item
//       })
//       return {
//         ...state,
//         cards: list,
//       }
//     case 'card/delete':
//       const items = state.cards.filter(
//         (item: Card) => String(item.id) !== action.deleteId
//       )
//       return {
//         ...state,
//         cards: items,
//       }
//     case 'card/setId':
//       return {
//         ...state,
//         setId: action.setId,
//       }
//     case 'card/setCotentId':
//       return {
//         ...state,
//         setCotentId: action.setCotentId,
//       }
//     default:
//       return state
//   }
// }
