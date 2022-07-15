import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { Dictio } from '../type/dictio'
import { useSelector } from 'react-redux'
import { modalAddStyle } from '../helper/styleHelper'
import { RootStore } from '../store/modules/reducer'
import Typography from '@mui/material/Typography'
import EditDictio from './EditDictio'

type Props = {
  modalType?: string
  modalView: boolean
  modalId?: number
  handleModalClose: () => void
}

function ModalDictio(props: Props) {
  const { modalType, modalView, modalId } = props
  const items = useSelector((state: RootStore) => {
    return state.dictio.items
  })
  const [openModal, openModalSet] = useState(false)
  const [dictio, dictioSet] = useState<Dictio>({
    title: '',
    user_id: '',
    disc: '',
    env: '',
    levelise: '',
    goal: '',
    rate: 0,
    id: 0,
  })
  const handleModalClose = () => {
    openModalSet(false)
    props.handleModalClose()
  }

  useEffect(() => {
    openModalSet(modalView)
  }, [modalView])

  useEffect(() => {
    if (modalType === 'view' || modalType === 'edit') {
      const item = items.filter((item: Dictio) => item.id === modalId)
      console.log(item[0])
      dictioSet(item[0])
    }
  }, [modalType, modalId])

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
          {props.modalType === 'view' ? (
            <Box sx={modalAddStyle}>
              <div className="fields p-4">
                <div className="field">
                  <Typography variant="h5" gutterBottom component="div">
                    {dictio.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom component="div">
                    {dictio.disc}
                  </Typography>
                  <Typography variant="body1" gutterBottom component="div">
                    {dictio.env}
                  </Typography>
                  <Typography variant="body1" gutterBottom component="div">
                    {dictio.levelise} |
                    回数の情報量は個人が結果からフィードバックで調整する。
                    <br />
                    計画の立案数 a ~ z | 経験 A ~ Z | 計画の立案数　00
                  </Typography>
                  <Typography variant="body1" gutterBottom component="div">
                    {dictio.goal} <br />
                    問題数 00 | 最終目的と細分化項目数 A ~ Z | 達成数　00
                  </Typography>
                  <Typography variant="body1" gutterBottom component="div">
                    {dictio.rate}
                  </Typography>
                </div>
              </div>
            </Box>
          ) : (
            <EditDictio
              item={dictio}
              editType={modalType!}
              editId={modalId!}
              handleModalClose={() => handleModalClose()}
            />
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ModalDictio
