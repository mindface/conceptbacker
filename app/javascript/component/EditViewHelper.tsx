import React from 'react'

function EditViewHelper(text: string, type: string) {
  if (type === 'h1') return <h1 dangerouslySetInnerHTML={{ __html: text }}></h1>
  if (type === 'h2') return <h2 dangerouslySetInnerHTML={{ __html: text }}></h2>
  if (type === 'h3') return <h3 dangerouslySetInnerHTML={{ __html: text }}></h3>
  if (type === 'photo') return <img src={text} />
  if (type === 'video') return <video src={text} controls />
  if (type === 'normal')
    return <p dangerouslySetInnerHTML={{ __html: text }}></p>
}
export default EditViewHelper
