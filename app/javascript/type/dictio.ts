export interface initalDictioState {
  items: Dictios
  modalView: boolean
}

export interface Bodyist {
  keyId: string
  text: string
  textType: string
  disc: string
}

export interface Dictio {
  title: string
  user_id: string
  disc: string
  env: string
  levelise: string
  goal: string
  rate: number
  id?: number
  created_at?: string
  updated_at?: string
}

export type Dictios = Dictio[]
