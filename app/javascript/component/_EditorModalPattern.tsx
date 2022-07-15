import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { useStore, useSelector } from 'react-redux'
import { AddPostData, UpdatePostData } from '../store/modules/data_action/post'
import { AppDispatch } from '../store/index'

import { EditorState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { RootStore } from '../store/modules/reducer'
import { useDispatch } from 'react-redux'

import { Post } from '../type/post'
import { modalStyle } from '../helper/styleHelper'

type Props = {
  modalType?: string
  modalView: boolean
  modalId?: number
  handleModalClose: () => void
}

function ModalPattern(props: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const pattern = useSelector((state: RootStore) => {
    return state.post.postDataItem
  })
  const [openModal, openModalSet] = useState(false)
  const [post, postSet] = useState<Post>({
    title: '',
    body: '',
    info: '',
    id: 0,
    created_at: '',
    updated_at: '',
  })
  const [title, titleSet] = useState('')
  const [body, bodySet] = useState('')
  const [info, infoSet] = useState('')
  const [editorState, editorStateSet] = useState(EditorState.createEmpty())

  const handleModalSave = () => {
    const sendData = {
      title: title,
      body: body,
      info: info,
    }
    dispatch(AddPostData(sendData))
    props.handleModalClose()
  }
  const handleModalClose = () => {
    openModalSet(false)
    props.handleModalClose()
  }

  const handleModalUpdate = () => {
    const sendData = {
      id: post.id,
      title: title,
      body: body,
      info: info,
    }
    dispatch(UpdatePostData(sendData))
    props.handleModalClose()
  }

  useEffect(() => {
    openModalSet(props.modalView)
    if (props.modalType === 'create') {
      titleSet('')
      bodySet('')
      infoSet('')
    }
    if (props.modalType === 'edit') {
      const item = pattern.filter((item: Post) => props.modalId === item.id)
      console.log(item)
      titleSet(item[0].title)
      bodySet(item[0].body)
      infoSet(item[0].info)
      postSet(item[0])
    }
  }, [props.modalView])

  const editorStateChange = (e: EditorState) => {
    console.log(e)
    console.log(editorState)
    editorStateSet(e)
  }

  return (
    <div>
      <Modal
        keepMounted
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className={openModal ? 'on-modal' : ''}>
          <Box sx={modalStyle}>
            <div className="field p-2">
              {props.modalType === 'create' ? '新規追加' : '編集'}
            </div>
            <div className="field p-2">
              <input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  titleSet(e.currentTarget.value)
                }
              />
            </div>
            <div className="field p-2">
              {/* <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={(e:EditorState) => {editorStateChange(e)}}
              />
              <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
              /> */}
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="本文"
                multiline
                rows={4}
                defaultValue="Default Value"
                value={body}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  bodySet(e.currentTarget.value)
                }
              />
            </div>
            <div className="field p-2">
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="詳細"
                multiline
                rows={4}
                defaultValue="Default Value"
                value={info}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  infoSet(e.currentTarget.value)
                }
              />
            </div>
            <div className="field p-2">
              {props.modalType === 'create' ? (
                <Button
                  variant="contained"
                  component="p"
                  sx={{ borderRadius: 16, overflow: 'hidden' }}
                  onClick={() => handleModalSave()}
                >
                  追加
                </Button>
              ) : (
                <Button
                  variant="contained"
                  component="p"
                  sx={{ borderRadius: 16, overflow: 'hidden' }}
                  onClick={() => handleModalUpdate()}
                >
                  更新
                </Button>
              )}
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  )
}

export default ModalPattern
