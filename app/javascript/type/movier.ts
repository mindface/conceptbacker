export interface InitalMovierState {
  items: Movier[]
  modalView: boolean
}

export type VodeoProcessing = {
  name: string
  record: {
    id: string
    title: string
    introduction: string
    conectid: string
    created_at: string
    updated_at: string
  }
}

export interface AddMovier {
  title: string
  introduction: string
  conectid?: string
  video?: VodeoProcessing
}

export interface Movier {
  title: string
  conectid?: string
  introduction?: string
  video?: VodeoProcessing
  path: string
  id?: number
  created_at?: string
  updated_at?: string
}

export type Movieis = Movier[]
