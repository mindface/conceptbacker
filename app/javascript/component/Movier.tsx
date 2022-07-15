import React, { useEffect, useRef, useState } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Snackbar from '@mui/material/Snackbar'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { modalStyle } from '../helper/styleHelper'
import {
  getMovieData,
  addMovieData,
  deleteImagerData,
} from '../store/modules/data_action/movier'
import {
  getImagerData,
  addImagerData,
} from '../store/modules/data_action/imager'
import { Movier } from '../type/movier'
import { setBlob } from '../lib/setBlob'

function Movier() {
  const store = useStore()
  const dispatch: AppDispatch = useDispatch()
  const [openUpload, openUploadSet] = useState(false)
  const [snackbar, snackbarSet] = useState(false)
  const [previewUrl, previewUrlSet] = useState('')
  const [snackbarMsg, snackbarMsgSet] = useState('')
  const movieList = useSelector((state: RootStore) => state.movier.items)

  const [open, setOpen] = useState(false)
  const [deleteModal, deleteModalSet] = useState(false)
  const fileInfo = useRef<HTMLInputElement>(null)
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
  const deleteAction = (id: number) => {
    dispatch(deleteImagerData(id))
    deleteModalSet(false)
  }
  const upLoadAction = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const BolbData = URL.createObjectURL(e.target.files[0]!)
    previewUrlSet(BolbData)
  }

  const movieUpload = () => {
    const formData = new FormData(form.current!)
    const element = fileInfo.current as HTMLInputElement
    if (!element.files) return
    const file: File = element.files[0]
    const reader = new FileReader()
    dispatch(addMovieData(formData))
    reader.onload = () => {}
    reader.readAsText(file)
  }

  const setImageUpload = async (item: Movier, index: number) => {
    const video = document.getElementById(`video${index}`) as HTMLVideoElement
    const canvas = document.createElement('canvas')
    canvas.width = video?.clientWidth
    canvas.height = video?.clientHeight
    const ctx = canvas.getContext('2d')
    ctx?.drawImage(video, 0, 0, video?.clientWidth, video?.clientHeight)
    const blob = (await setBlob(canvas)) as File

    const formData = new FormData()
    formData.append('imaring[name]', item.title)
    formData.append('imaring[conectid]', item.conectid!)
    formData.append('imaring[images][]', blob)

    dispatch(addImagerData(formData))
    snackbarMsgSet(' 画像化してアップロードしました。')
    snackbarSet(true)
    setTimeout(() => {
      dispatch(getImagerData())
    }, 1000)
  }

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path)
    snackbarMsgSet(' パスをコピーしました。')
    snackbarSet(true)
  }

  const palyVideo = async (id: string, type: string) => {
    const video = document.getElementById(id) as HTMLMediaElement
    console.log(id)
    console.log(video)
    switch (type) {
      case 'pray':
        await video.play()
        break
      case 'pause':
        await video.pause()
        break
    }
  }

  useEffect(() => {
    dispatch(getMovieData())
    setTimeout(() => {
      console.log('movieList')
    }, 3000)
  }, [])

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <PlayCircleOutlineIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="responsive-dialog-title">
          <Button aria-label="menu" onClick={handleUploadkOpen}>
            {'動画アップロード'}
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
                <label htmlFor="upload" className="label btn">
                  {'ファイルの選択'}
                </label>
                <p className="field p-2">
                  タイトル　:{' '}
                  <input
                    type="text"
                    name="video[title]"
                    id=""
                    className="p-1"
                  />
                </p>
                <p className="field p-2">
                  ID :{' '}
                  <input
                    type="text"
                    name="video[conectid]"
                    id=""
                    className="p-1"
                  />
                </p>
                <p className="field p-2">
                  <input
                    ref={fileInfo}
                    type="file"
                    className="p-1"
                    id="upload"
                    accept="video/*"
                    name="video[video]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      upLoadAction(e)
                    }
                  />
                </p>
              </div>
            </form>
            <Button aria-label="menu" onClick={() => movieUpload()}>
              {'動画アップロード'}
              <FileUploadIcon />
            </Button>
            {previewUrl !== '' && (
              <img src={previewUrl} alt="" className="img" />
            )}
          </DialogContent>
        </Dialog>
        <DialogContent>
          <h3>動画のアップローダー</h3>
          {movieList.map((item: Movier, index: number) => (
            <Card sx={{ display: 'flex', p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1 }}>
                <CardContent>
                  <Typography component="div" variant="h5">
                    {item.title}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pl: 1,
                    pb: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    aria-label="play/pause"
                    onClick={() => palyVideo(`video${index}`, 'play')}
                  >
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="play/pause"
                    onClick={() => palyVideo(`video${index}`, 'pause')}
                  >
                    <StopCircleIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => copyPath(item.path)}>
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setImageUpload(item, index)}
                  >
                    <AddPhotoAlternateIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteModalSet(true)}>
                    <DeleteIcon />
                  </IconButton>
                  <Snackbar
                    open={snackbar}
                    autoHideDuration={1000}
                    onClose={() => snackbarSet(false)}
                    message={snackbarMsg}
                  />
                </Box>
              </Box>
              <video
                width="300"
                id={`video${index}`}
                src={item.path}
                controls
              ></video>
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
            </Card>
          ))}
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

export default Movier
