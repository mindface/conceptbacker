import React, { useState } from 'react'

function Base() {
  const [isChecked, setIsChecked] = useState(false)

  const onChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div>
      <div className="ttt">kokoko</div>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {isChecked ? 'labelOn' : 'labelOff'}
    </div>
  )
}

export default Base
