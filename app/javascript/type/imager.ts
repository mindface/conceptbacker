export interface InitalImagerState {
  items: Imager[]
  modalView: boolean
}

export type ImageProcessing = {
  name: string
  record: {
    id: string
    name: string
    conectid: string
    created_at: string
    updated_at: string
  }
}

export interface AddImager {
  name: string
  conectid?: string
  images?: ImageProcessing
  path: string[]
}

export interface Imager {
  name: string
  conectid?: string
  images?: ImageProcessing
  path: string[]
  id?: number
  created_at?: string
  updated_at?: string
}

export type Imageis = Imager[]
