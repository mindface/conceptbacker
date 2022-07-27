export interface initalQuantifyState {
  items: Quantifies
  item: Quantify
}

export interface Bodyist {
  keyId: string
  text: string
  textType: string
  disc: string
}

export interface Quantify {
  title: string
  user_id: string
  disc: string
  leveliseNum: string
  goalNum: string
  rateNum: number
  id?: number
  created_at?: string
  updated_at?: string
}

export type Quantifies = Quantify[]
