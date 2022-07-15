import React, { useEffect, useState, useRef, KeyboardEvent } from 'react'
import ReactDOM from "react-dom";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import IconButton from '@mui/material/IconButton'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import DeleteIcon from '@mui/icons-material/Delete'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import { useSelector } from 'react-redux'
import { AddPostData, UpdatePostData } from '../store/modules/data_action/post'
import { AppDispatch } from '../store/index'

import { RootStore } from '../store/modules/reducer'
import { useDispatch } from 'react-redux'

import { Post, Bodyist } from '../type/post'
import { modalAddStyle } from '../helper/styleHelper'

import EditViewHelper from './EditViewHelper'
import Imager from './Imager'
import Movier from './Movier'
import EditDiscAid from './EditDiscAid'

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
  const linkTag = useRef(null)
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
  const [disc, discSet] = useState('')
  const [bodyList, bodyListSet] = useState([
    { keyId: '0', text: 'text', textType: 'normal', disc: '' },
  ])

  const [info, infoSet] = useState('')
  const [linkUrl, linkUrlSet] = useState('')
  const [linkText, linkTextSet] = useState('')
  const [linkAddNumber, linkAddNumberSet] = useState(0)

  const handleModalSave = () => {
    const sendData = {
      title: title,
      body: JSON.stringify(bodyList),
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
      body: JSON.stringify(bodyList),
      info: info,
    }
    dispatch(UpdatePostData(sendData))
    props.handleModalClose()
  }

  const addBodyList = () => {
    bodyListSet([
      ...bodyList,
      {
        keyId: `${bodyList.length + 1}`,
        text: '',
        textType: 'normal',
        disc: '',
      },
    ])
  }

  const deleteBodyList = (keyId: string) => {
    const list = bodyList.filter((item: Bodyist) => item.keyId !== keyId)
    bodyListSet(list)
  }

  const bodyListTypeSetter = (keyId: string, type: string) => {
    const list = bodyList.map((item: Bodyist) => {
      if (item.keyId === keyId) item.textType = type
      return item
    })
    bodyListSet(list)
  }

  const setLink = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    // if(linkUrl === "") return
    const text = e.target as HTMLTextAreaElement
    const number = text.selectionStart
    linkAddNumberSet(Number(number))
  }

  const addLink = (item: Bodyist, index: number) => {
    const list = bodyList.map((_item: Bodyist, i: number) => {
      if (index === i) {
        const text = item.text
        const before = text.substring(0, linkAddNumber)
        const after = text.substring(linkAddNumber, text.length)
        const __item = {
          ..._item,
          text: `${before}<a href='${linkUrl}'>${linkText}</a>${after}`,
        }
        return __item
      }
      return _item
    })
    bodyListSet(list)
  }

  const setBodyList = (value: string, index: number, type: string) => {
    if (bodyList.length === 0) return
    const list = bodyList.map((item: Bodyist, i: number) => {
      if (index === i) {
        const _item = { ...item, [type]: value }
        return _item
      }
      return item
    })
    bodyListSet(list)
  }

  const keyEvent = (e:React.KeyboardEvent,index:number) => {
    const textArea = e.target as HTMLTextAreaElement
    const textNumber = textArea.value.length
    const pos = textArea.selectionStart
    if(
      e.keyCode === 13 &&
      index === (bodyList.length-1) &&
      textNumber == pos
     ){
      addBodyList()
      setTimeout(() => {
        const textarea = document.getElementById(`textarea${index+1}`) as HTMLDivElement
        const target = ReactDOM.findDOMNode(textarea) as HTMLTextAreaElement
        target.focus()
        target.setSelectionRange(0, 0)
      }, 600);
    }
  }

  useEffect(() => {
    openModalSet(props.modalView)
    if (props.modalType === 'create') {
      titleSet('')
      bodySet('')
      infoSet('')
      discSet('')
    }
    if (props.modalType === 'edit') {
      const item = pattern.filter((item: Post) => props.modalId === item.id)
      const list = JSON.parse(item[0].body)
      titleSet(item[0].title)
      bodySet(item[0].body)
      bodyListSet(list)
      infoSet(item[0].info)
      postSet(item[0])
      if (list.disc) discSet(list.disc)
    }
  }, [props.modalView])

  return (
    <div className="modal-pattern">
      <Modal
        keepMounted
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className={openModal ? 'on-modal' : ''}>
          <Box sx={modalAddStyle}>
            <div className="flex flex-w">
              <div className="fields w-half">
                <div className="field p-2 flex f-align-c">
                  {props.modalType === 'create' ? '新規追加' : '編集'}
                  <Imager />
                  <Movier />
                </div>
                <div className="field p-2">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="タイトル"
                    variant="outlined"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      titleSet(e.currentTarget.value)
                    }
                  />
                </div>
                <div className="field p-2">
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="本文"
                    multiline
                    rows={2}
                    defaultValue="Default Value"
                    value={body}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      bodySet(e.currentTarget.value)
                    }
                  />
                </div>
                <div className="field p-2 field-body relative border radius">
                  <Box sx={{ position: 'absolute', left: -8, bottom: -8 }}>
                    <Button
                      variant="contained"
                      component="p"
                      sx={{
                        borderRadius: 16,
                        overflow: 'hidden',
                        minWidth: 32,
                      }}
                      onClick={() => addBodyList()}
                    >
                      <ControlPointIcon />
                    </Button>
                  </Box>
                  {bodyList.map((item: Bodyist, index: number) => (
                    <div className="textFieldBox relative pt-1 pb-1">
                      <div className="toolbar d-f box-shadow bg-w-c">
                        <div
                          className={
                            item.textType === '' ? 'btn d-i' : 'btn d-i'
                          }
                        >
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                              deleteBodyList(item.keyId)
                            }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                        <div
                          className={
                            item.textType === 'photo'
                              ? 'active btn d-i'
                              : 'btn d-i'
                          }
                        >
                          <IconButton
                            aria-label="PhotoSizeSelectActualIcon"
                            size="small"
                            onClick={() =>
                              bodyListTypeSetter(item.keyId, 'photo')
                            }
                          >
                            <PhotoSizeSelectActualIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                        <div
                          className={
                            item.textType === ' video'
                              ? 'active btn d-i'
                              : 'btn d-i'
                          }
                        >
                          <IconButton
                            aria-label="PhotoSizeSelectActualIcon"
                            size="small"
                            onClick={() =>
                              bodyListTypeSetter(item.keyId, 'video')
                            }
                          >
                            <PhotoCameraFrontIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                        <div
                          className={
                            item.textType === 'h1'
                              ? 'active btn d-i'
                              : 'btn d-i'
                          }
                        >
                          <IconButton
                            aria-label="タイトル1"
                            size="small"
                            onClick={() => bodyListTypeSetter(item.keyId, 'h1')}
                          >
                            h1
                          </IconButton>
                        </div>
                        <div
                          className={
                            item.textType === 'h2'
                              ? 'active btn d-i'
                              : 'btn d-i'
                          }
                        >
                          <IconButton
                            aria-label="タイトル2"
                            size="small"
                            onClick={() => bodyListTypeSetter(item.keyId, 'h2')}
                          >
                            h2
                          </IconButton>
                        </div>
                        <div
                          className={
                            item.textType === 'h3'
                              ? 'active btn d-i'
                              : 'btn d-i'
                          }
                        >
                          <IconButton
                            aria-label="タイトル3"
                            size="small"
                            onClick={() => bodyListTypeSetter(item.keyId, 'h3')}
                          >
                            h3
                          </IconButton>
                        </div>
                        <div
                          className={
                            item.textType === 'normal'
                              ? 'active btn d-i'
                              : 'btn d-i'
                          }
                        >
                          <IconButton
                            aria-label="ノーマル"
                            size="small"
                            onClick={() =>
                              bodyListTypeSetter(item.keyId, 'normal')
                            }
                          >
                            ノーマル
                          </IconButton>
                        </div>
                        <div className="btn d-i hover-wapper target">
                          <IconButton
                            aria-label="ノーマル"
                            size="small"
                            id="fade-button"
                          >
                            <InsertLinkIcon />
                          </IconButton>
                          <div className="link-box target-box-f box-shadow position-br">
                            <label htmlFor="linkText" className="label d-i">
                              テキスト :
                              <input
                                type="text"
                                id="linkText"
                                value={linkText}
                                onChange={(e) => {
                                  linkTextSet(e.target.value)
                                }}
                              />
                            </label>
                            <label htmlFor="linkUrl" className="label d-i">
                              URL :
                              <input
                                type="text"
                                id="linkUrl"
                                ref={linkTag}
                                value={linkUrl}
                                onChange={(e) => {
                                  linkUrlSet(e.target.value)
                                }}
                              />
                            </label>
                            <IconButton
                              component="p"
                              size="small"
                              sx={{ borderRadius: 16, overflow: 'hidden' }}
                              onClick={() => addLink(item, index)}
                            >
                              追加
                            </IconButton>
                          </div>
                        </div>
                      </div>

                      <EditDiscAid
                        text={disc}
                        setText={(text: string) =>
                          setBodyList(text, index, 'disc')
                        }
                      />
                      <textarea
                        id={`textarea${index}`}
                        className="input"
                        value={item.text}
                        onClick={(e: React.MouseEvent<HTMLTextAreaElement>) => {
                          setLink(e)
                        }}
                        onKeyDown={(e:KeyboardEvent) => { keyEvent(e,index)}}  
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBodyList(e.currentTarget.value, index, 'text')}
                      />
                    </div>
                  ))}
                </div>
                <div className="field p-2">
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="情報の前提と例外情報"
                    multiline
                    rows={2}
                    maxRows={2}
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
              </div>
              <div className="fields w-half">
                <div className="field-view p-2">
                  {bodyList.map((item: Bodyist) => (
                    <div className="textlist pb-2">
                      {EditViewHelper(item.text, item.textType)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  )
}

export default ModalPattern
