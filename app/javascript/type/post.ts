export interface initalPostState {
  postDataItem: Posts
  modalView: boolean
}

export interface Bodyist {
  keyId: string
  text: string
  textType: string
  disc: string
}

export interface Post {
  title: string
  body: string
  info: string
  id?: number
  created_at?: string
  updated_at?: string
}

export type Posts = Post[]
