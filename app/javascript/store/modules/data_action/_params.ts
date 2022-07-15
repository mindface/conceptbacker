export const AddParams = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
  body: '',
}

type Param = {
  method: string
  headers: {
    'Content-Type': string
  }
  body?: string | FormData
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

export const deleteParams = {
  method: 'DELETE',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
}
