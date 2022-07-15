import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ButtonGroup from '@mui/material/ButtonGroup'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import EditIcon from '@mui/icons-material/Edit'

import Imager from './Imager'
import Movier from './Movier'
import EditView from './EditView'

import ModalPattern from './ModalPattern'
import { RootStore } from '../store/modules/reducer'

import { useDispatch, useSelector } from 'react-redux'
import { getPostData, DeletePostData } from '../store/modules/data_action/post'
import { useStore } from 'react-redux'
import { AppDispatch } from '../store'
import { modalStyle } from '../helper/styleHelper'

function SectionDataList() {
  const store = useStore()
  const dispatch: AppDispatch = useDispatch()
  const posts = useSelector((state: RootStore) => {
    return state.post.postDataItem
  })

  const [modalType, modalTypeSet] = useState('create')
  const [openModal, openModalSet] = useState(false)
  const [deleteModal, deleteModalSet] = useState(false)
  const [postId, postIdSet] = useState(-1)
  const handleModalOpen = () => openModalSet(true)
  const handleModalClose = () => openModalSet(false)

  useEffect(() => {
    dispatch(getPostData())
  }, [])

  const actions = [
    {
      icon: (
        <IconButton onClick={handleModalOpen}>
          <EditIcon />
        </IconButton>
      ),
      name: 'Edit',
    },
    { icon: <Imager />, name: 'Image upload' },
    { icon: <Movier />, name: 'Movie upload' },
  ]

  return (
    <section className="p-4">
      <Box
        sx={{
          width: '100%',
          maxWidth: 640,
          margin: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        <List aria-label="main mailbox folders">
          {posts.map((item) => {
            return (
              <ListItem
                secondaryAction={
                  <div>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <IconButton>
                        <CreateIcon
                          onClick={() => {
                            handleModalOpen()
                            modalTypeSet('edit')
                            postIdSet(item.id!)
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <ListAltIcon
                          onClick={() => {
                            deleteModalSet(true)
                            modalTypeSet('view')
                            postIdSet(item.id!)
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon
                          onClick={() => {
                            deleteModalSet(true)
                            modalTypeSet('delete')
                            postIdSet(item.id!)
                          }}
                        />
                      </IconButton>
                    </ButtonGroup>
                  </div>
                }
              >
                <ListItemText primary={item.title} />
              </ListItem>
            )
          })}
          {posts.length === 0 && (
            <ListItem>
              <ListItemText>表示するデータがありません。</ListItemText>
            </ListItem>
          )}
        </List>
        <Divider />
      </Box>
      <div>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
        <ModalPattern
          modalType={modalType}
          modalView={openModal}
          modalId={postId}
          handleModalClose={() => handleModalClose()}
        />
        <Modal
          keepMounted
          open={deleteModal}
          onClose={() => deleteModalSet(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          {modalType === 'view' ? (
            <Box sx={modalStyle}>
              <EditView viewId={postId} />
            </Box>
          ) : (
            <Box sx={modalStyle}>
              <div className="pb-2">
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h2"
                >
                  この操作は取り消せません。実行しますか。
                </Typography>
              </div>
              <p>
                <span className="mr-2">
                  <Button
                    className="mr-2"
                    variant="contained"
                    onClick={() => deleteModalSet(false)}
                  >
                    閉じる
                  </Button>
                </span>
              </p>
            </Box>
          )}
        </Modal>
      </div>
    </section>
  )
}

export default SectionDataList
