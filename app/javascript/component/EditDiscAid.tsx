import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ReadMoreIcon from '@mui/icons-material/ReadMore'

type Porps = {
  text: string
  setText: (text: string) => void
}

function EditDiscAid(props: Porps) {
  const { text, setText } = props
  const [disc, discSet] = useState('')

  useEffect(() => {
    discSet(text)
  }, [text])

  return (
    <Box
      className="disc-box p-1 bg-w-c box-shadow radius"
      sx={{ position: 'absolute', top: 8, left: '100%' }}
    >
      <div className="disc">
        <h4 className="caption">詳細と前提</h4>
        <div className="disc-view p-2">
          <textarea
            className="textarea p-1 radius"
            cols={30}
            rows={10}
            value={disc}
            onChange={(e) => discSet(e.currentTarget.value)}
          ></textarea>
          <IconButton
            aria-label="ノーマル"
            size="small"
            id="fade-button"
            onClick={() => {
              setText(disc)
            }}
          >
            <ReadMoreIcon />
          </IconButton>
        </div>
      </div>
    </Box>
  )
}
export default EditDiscAid
