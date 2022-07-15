import React, { useEffect, useRef, useState } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Typography from '@mui/material/Typography'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Snackbar from '@mui/material/Snackbar'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@mui/material/styles'

import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import {
  getImagerData,
  addImagerData,
  deleteImagerData,
} from '../store/modules/data_action/imager'
import { Imager } from '../type/imager'
import { modalStyle } from '../helper/styleHelper'

function Imager() {
  const store = useStore()
  const dispatch: AppDispatch = useDispatch()
  const [openUpload, openUploadSet] = useState(false)
  const [snackbar, snackbarSet] = useState(false)
  const [previewUrl, previewUrlSet] = useState('')
  const imageList = useSelector((state: RootStore) => state.imager.items)

  const [open, setOpen] = useState(false)
  const [deleteModal, deleteModalSet] = useState(false)
  const [fileInfo, fileInfoSet] = useState<File>()
  const theme = useTheme()
  const form = useRef<HTMLFormElement>(null)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleUploadkOpen = () => {
    openUploadSet(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUploadClose = () => {
    openUploadSet(false)
  }

  const upLoadAction = (file: File) => {
    const formData = new FormData(form.current!)
    formData.append('imaring[images][]', file)

    const reader = new FileReader()
    reader.onload = () => {
      dispatch(addImagerData(formData))
    }
    reader.readAsText(file)
  }

  const deleteAction = (id: number) => {
    dispatch(deleteImagerData(id))
  }

  const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file: File = e.target.files[0]
    fileInfoSet(file)
    setTimeout(() => {
      upLoadAction(file)
    }, 1000)
    const BolbData = URL.createObjectURL(file)
    previewUrlSet(BolbData)
  }

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path)
    snackbarSet(true)
  }

  useEffect(() => {
    dispatch(getImagerData())
  }, [])

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <PhotoSizeSelectActualIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ zIndex: 10 }}
      >
        <DialogTitle id="responsive-dialog-title">
          <Button aria-label="menu" onClick={handleUploadkOpen}>
            {'画像アップロード'}
            <FileUploadIcon />
          </Button>
        </DialogTitle>
        <Dialog
          open={openUpload}
          onClose={handleUploadClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent id="responsive-dialog-title">
            <form ref={form} method="post" encType="multipart/form-data">
              <div>
                <p className="field p-2">
                  タイトル　:{' '}
                  <input
                    type="text"
                    name="imaring[name]"
                    id=""
                    className="p-1"
                  />
                </p>
                <p className="field p-2">
                  ID :{' '}
                  <input
                    type="text"
                    name="imaring[conectid]"
                    id=""
                    className="p-1"
                  />
                </p>
                <p className="field p-2">
                  <label htmlFor="upload" className="label btn">
                    {'ファイルの選択'}
                  </label>
                  <input
                    type="file"
                    id="upload"
                    className="input btn"
                    name="imarings[images]"
                    onChange={imageUpload}
                  />
                </p>
              </div>
            </form>
            <Button aria-label="menu">
              {'画像アップロード'}
              <FileUploadIcon />
            </Button>
            {previewUrl !== '' && (
              <img src={previewUrl} alt="" className="img" />
            )}
          </DialogContent>
        </Dialog>
        <DialogContent>
          <h3>動画のアップローダー</h3>
          <ImageList cols={3} rowHeight={260}>
            {imageList.map((item: Imager, index: number) => {
              return item.path.map((path: string) => (
                <ImageListItem key={index}>
                  <img
                    src={`${path}?w=248&fit=crop&auto=format`}
                    srcSet={`${path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={item.conectid}
                    position="top"
                  />
                  <ImageListItemBar
                    actionIcon={
                      <ButtonGroup variant="contained">
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          onClick={() => copyPath(path)}
                        >
                          <CopyAllIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          onClick={() => deleteModalSet(true)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ButtonGroup>
                    }
                  />
                  <Snackbar
                    open={snackbar}
                    autoHideDuration={1000}
                    onClose={() => snackbarSet(false)}
                    message="コピーしました。"
                  />
                  <Modal
                    keepMounted
                    open={deleteModal}
                    onClose={() => deleteModalSet(false)}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                  >
                    <Box sx={modalStyle}>
                      <div className="pb-2">
                        <Typography
                          id="keep-mounted-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          この操作は取り消せません。画像を削除しますか。
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
                        <span className="mr-2">
                          <Button
                            className="mr-2"
                            variant="contained"
                            color="error"
                            onClick={() => deleteAction(item.id!)}
                          >
                            削除
                          </Button>
                        </span>
                      </p>
                    </Box>
                  </Modal>
                </ImageListItem>
              ))
            })}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Imager
