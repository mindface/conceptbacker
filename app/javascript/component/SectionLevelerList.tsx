import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Backdrop from '@mui/material/Backdrop'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'

import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import EditIcon from '@mui/icons-material/Edit'
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'

import ModalDictio from './ModalDictio'

import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../store/modules/reducer'
import { AppDispatch } from '../store'
import { getDictioData } from '../store/modules/data_action/dictio'

function SectionLeveler() {
  const dispatch: AppDispatch = useDispatch()
  const items = useSelector((state: RootStore) => state.dictio.items)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [dialOpen, dialOpenSet] = useState(false)
  const [menuId, menuIdSet] = useState(0)
  const [modalOpen, modalOpenSet] = useState(false)
  const [modalType, modalTypeSet] = useState('')
  const [modalId, modalIdSet] = useState(-1)
  const handleDialOpen = () => dialOpenSet(true)
  const handleDialClose = () => dialOpenSet(false)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const modalAction = (type: string) => {
    modalOpenSet(true)
    modalTypeSet(type)
    handleClose()
  }

  const daySettings = (time: string) => {
    const t = new Date(time)
    return `${t.getFullYear()} | ${t.getMonth() + 1} | ${t.getDate()}`
  }

  useEffect(() => {
    dispatch(getDictioData())
  }, [])

  const actions = [
    {
      icon: <EditIcon onClick={() => modalAction('create')} />,
      name: '新規作成',
    },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
  ]

  return (
    <section className="p-4">
      <div className="dictio leveler">
        <List
          sx={{
            width: '100%',
            maxWidth: 960,
            margin: '0 auto',
            bgcolor: 'background.paper',
          }}
        >
          {items.map((item,index) => (
            <ListItem
              secondaryAction={
                <IconButton
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(e) => {
                    modalIdSet(item.id!)
                    menuIdSet(index)
                    handleClick(e)
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>Info</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={daySettings(item.created_at!)}
              />
              { menuId === index && <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => modalAction('view')}>確認</MenuItem>
                <MenuItem onClick={() => modalAction('edit')}>編集</MenuItem>
                <MenuItem onClick={() => modalAction('delete')}>削除</MenuItem>
              </Menu>}
            </ListItem>
          ))}
        </List>
      </div>
      <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleDialClose}
          onOpen={handleDialOpen}
          open={dialOpen}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleDialClose}
            />
          ))}
        </SpeedDial>
      </Box>
      <ModalDictio
        modalType={modalType}
        modalView={modalOpen}
        modalId={modalId}
        handleModalClose={() => modalOpenSet(false)}
      />
    </section>
  )
}
export default SectionLeveler
