import { fetch } from '@hotwired/stimulus'

type Param = {
  method: string
  headers: {
    'Content-Type': string
  }
  body?: string
}

export const setParams = (type: string): Param => {
  const _: Param = {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '',
  }

  if (type === 'GET') {
    delete _['body']
  }
  return _
}

export class ApiClient {
  // constructor() {}

  static async postData<T>(path: any, sendData: T): Promise<T | void> {
    try {
      const param = setParams('POST')
      param.body = JSON.stringify({ home: sendData })
      const res: any = await fetch(path, param)
      const result = await res.json()
      return result
    } catch (err) {
      console.log(err)
    }
    // return res.json()
  }

  static async updateData<T>(
    path: any,
    sendData: T,
    id: number
  ): Promise<T | void> {
    const param = setParams('PATCH')
    param.body = JSON.stringify({ home: sendData, id: id })
    console.log(path)
    console.log(param.body)
    const res: any = await fetch(path, param)
    const result = await res.json()
    return result
    // return res.json()
  }

  getData<T>(path: any): Promise<T> {
    return new Promise(async (resolve, eject) => {
      const param = setParams('GET')
      const response: any = await fetch(path, param)
      const data = await response.json()
      console.log(data)
      resolve(data)
    })
  }
}

export default ApiClient
