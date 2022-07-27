import React, { useEffect, useState } from 'react'
import { Post, Bodyist } from '../type/post'
import EditViewHelper from './EditViewHelper'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSelector } from 'react-redux'
import { RootStore } from '../store/modules/reducer'

function EditView(props: { viewId: number }) {
  const { viewId } = props
  const [bodyList, bodyListSet] = useState<Bodyist[]>([])
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const pattern = useSelector((state: RootStore) => state.post.postDataItem)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }
  useEffect(() => {
    const item = pattern.filter((item: Post) => item.id === viewId)
    bodyListSet(JSON.parse(item[0].body))
  }, [viewId])

  return (
    <div className="fields">
      <div className="field-view p-2">
        {bodyList.map((item: Bodyist, index: number) => (
          <div className="textlist pb-2">
            {item.disc ? (
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ boxShadow: 'none' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  {EditViewHelper(item.text, item.textType)}
                </AccordionSummary>
                <AccordionDetails>
                  <div className="text-sub bg-base-c p-1 l-h font-c-w">
                    詳細説明
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.disc ? item.disc : '説明はありません。',
                    }}
                  ></div>
                </AccordionDetails>
              </Accordion>
            ) : (
              EditViewHelper(item.text, item.textType)
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default EditView
