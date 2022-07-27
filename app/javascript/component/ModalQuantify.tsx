import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Box,
  List,
  ListItem,
  ListItemIcon,
  Dialog,
  DialogContent,
} from '@mui/material'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import PreviewIcon from '@mui/icons-material/Preview';
import { Quantify } from '../type/quantify'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../store/index'
import { RootStore } from '../store/modules/reducer'
import { GetQuantifyData, DeleteQuantifyData } from "../store/modules/data_action/quantify";
import EditQuantify from "./EditQuantify";

type Item = {id:number,name:string,valueLevel:string}

function ModalQuantify() {
  const dispatch:AppDispatch = useDispatch()
  const quantifies = useSelector((state: RootStore) => state.quantify.items)
  const [open,openSet] = useState(false)
  const [openList, openListSet] = useState(false)
  const [openItem, openItemSet] = useState(false)
  const [openDeleteDialog, openDeleteDialogSet] = useState(false)
  const [viewId, viewIdSet] = useState(0)
  const [deleteId, deleteIdSet] = useState(0)
  
  const SetJsonElement = (data:string) => {
    const reData = JSON.parse(data)
    return <List>{reData.map((item:Item) => <ListItem>
      <p>{item.name}</p>
      <p>{item.valueLevel}</p>
    </ListItem>)}</List>
  }

  const deleteAction = () => {
    dispatch(DeleteQuantifyData(deleteId))
    openDeleteDialogSet(false)
  }

  useEffect(() => {
    dispatch(GetQuantifyData())
  },[])

  return (
    <div>
      <Box className="disc-box m-4 p-1 bg-w-c box-shadow radius fixed" sx={{left: 20, bottom: 0}}>
        <Button onClick={() => openListSet(true)}><FormatListBulletedIcon /></Button>
        <Button onClick={() => openSet(true)}><AppRegistrationIcon /></Button>
      </Box>
      <Dialog
        open={openList}
        onClose={() => openListSet(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <List>
            {quantifies.map((item:Quantify,index:number) => 
            <ListItem
              sx={{ minWidth: 340 }}
              secondaryAction={
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button onClick={() => { openDeleteDialogSet(true); deleteIdSet(item.id!) }}><DeleteOutlineIcon /></Button>
                  <Button onClick={() => { openItemSet(true); viewIdSet(index)}}><PreviewIcon /></Button>
                </ButtonGroup>
              }
            >
              <ListItemIcon>{item.id}</ListItemIcon>{item.title}
            </ListItem>)}
            {quantifies.length === 0 && <div>表示情報がありません。</div>}
          </List>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openItem}
        onClose={() => openItemSet(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {quantifies[viewId] &&
          <List>
            <ListItem>タイトル | {quantifies[viewId].title}</ListItem>
            <ListItem>ID | {quantifies[viewId].user_id}</ListItem>
            <ListItem>詳細 | {quantifies[viewId].disc}</ListItem>
            <ListItem>{SetJsonElement(quantifies[viewId].leveliseNum)}</ListItem>
            <ListItem>{SetJsonElement(quantifies[viewId].goalNum)}</ListItem>
            <ListItem>{quantifies[viewId].rateNum}</ListItem>
            <ListItem><Button onClick={() => openItemSet(false)}>close</Button></ListItem>
          </List> }
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => openSet(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <List>
            <ListItem>この操作は取り消せません。削除しますか。</ListItem>
            <ListItem>
              <Button onClick={() => openDeleteDialogSet(false)}>戻る</Button>
              <Button color="error" onClick={() => deleteAction()}>削除</Button>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={() => openSet(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
           <EditQuantify editType={"create"} handleModalClose={() => openSet(false)}  />          
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default ModalQuantify
