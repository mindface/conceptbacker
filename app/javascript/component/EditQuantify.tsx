import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  TextField,
  Typography
} from '@mui/material'
import { Quantify } from '../type/quantify'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/index'
import { AddQuantifyData } from '../store/modules/data_action/quantify'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Tune } from '@mui/icons-material'

type Props = {
  item?: Quantify
  editType: string
  editId?: number
  handleModalClose: () => void
}

type List = {id:number,name:string,valueLevel:string}

function EditQuantify(props: Props) {
  const { item, editType, editId, handleModalClose } = props
  const dispatch:AppDispatch = useDispatch()

  const [quantify, quantifySet] = useState<Quantify>({
    title: "",
    user_id: "",
    disc: "",
    leveliseNum: "",
    goalNum: "",
    rateNum: 0,
    id: 0
  })
  const [leveliseNumList, leveliseNumListSet] = useState<List[]>([
    { id:1, name:"",valueLevel:""}
  ])
  const [goalNumList, goalNumListSet] = useState<List[]>([
    { id:1, name:"",valueLevel:""}
  ])

  const handleAdd = () => {
    const sendData = {
      title: quantify.title,
      user_id: quantify.user_id,
      disc: quantify.disc,
      leveliseNum: JSON.stringify(leveliseNumList),
      goalNum: JSON.stringify(goalNumList),
      rateNum: 0
    }
    dispatch(AddQuantifyData(sendData))
    handleModalClose()
  }

  const handleModalSave = () => {
    const sendData = {
      id: editId,
      title: quantify.title,
      user_id: 'user_id',
      disc: quantify.disc,
      rate: 0,
    }
    // if (editType === 'create') {
    //   delete sendData.id
    //   dispatch(AddDictioData(sendData))
    // } else {
    //   dispatch(UpdateDictioData(sendData))
    // }
    handleModalClose()
  }

  const hundleListAdd = (ListType:string) => {
    let setList = leveliseNumList
    if(ListType === 'goal') setList = goalNumList
    ListType === 'level' ?
      leveliseNumListSet([...setList,{id:setList.length+1, name:"",valueLevel:""}])
      : goalNumListSet([...setList,{id:setList.length+1, name:"",valueLevel:""}])
  }

  const hundleUpdate = (item:List,ListType:string,type:string,value:string) =>  {
    let setList = leveliseNumList
    if(ListType === 'goal') setList = goalNumList
    const list = setList.map((levelItem:List) => {
      return item.id === levelItem.id ? {...levelItem,[type]:value} : levelItem
    })
    ListType === 'level' ? leveliseNumListSet(list) : goalNumListSet(list)
  }

  const hundleDelete = () => {
    // dispatch(DeletePostData(editId!))
    handleModalClose()
  }

  useEffect(() => {
    if (editType === 'edit') {
      // dictioSet(item)
      // const leveliseList = item.levelise.split('|')
      // const goalList = item.goal.split('|')
      // if(leveliseList[0] === '') {
      //   dictioPlanSet(0)
      //   dictioImplementationSet(0)
      //   dictioResultSet(0)
      // }else {
      //   dictioPlanSet(Number(leveliseList[0]))
      //   dictioImplementationSet(Number(leveliseList[1]))
      //   dictioResultSet(Number(leveliseList[2]))
      // }
      // if(goalList[0] === '' ){
      //   dictioIssueSet(0)
      //   dictioVarianceSet(0)
      //   dictioAchieveSet(0)
      // }else {
      //   dictioIssueSet(Number(goalList[0]))
      //   dictioVarianceSet(Number(goalList[1]))
      //   dictioAchieveSet(Number(goalList[2]))
      // }
    }
  }, [editType, item])

  useEffect(() => {
    if (editType === 'create') {
      quantifySet({
        title: "",
        user_id: "",
        disc: "",
        leveliseNum: "",
        goalNum: "",
        rateNum: 0,
        id: 0
      })
    }
  }, [editType])

  return (
    <Box className="disc-box m-4 p-1">
      <div className="disc p-4">
        <h4 className="caption pb-2">タスクを構成する数値化を構造化します。</h4>
        <div className="fields">
          <div className="field pb-2">
              <div className='pb-1'>
                <TextField
                  fullWidth
                  label="タイトル"
                  className='mb-1'
                  variant="outlined"
                  value={quantify.title}
                  onChange={(e) =>
                    quantifySet({ ...quantify, title: e.currentTarget.value })
                  }
                />
              </div>
              <div className='pb-1'>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="詳細"
                  className='mb-1'
                  multiline
                  rows={4}
                  maxRows={4}
                  value={quantify.disc}
                  onChange={(e) =>
                    quantifySet({ ...quantify, disc: e.currentTarget.value })
                  }
                  variant="standard"
                />
              </div>
          </div>
          <div className="field pb-2">
            { leveliseNumList.map((item,index) => 
              <div className="field-items pb-1">
                <div className='pb-1'>
                  <TextField
                    fullWidth
                    label="レベライズの数値 ネーム"
                    className='mb-1'
                    variant="outlined"
                    value={item.name}
                    onChange={(e) =>
                      hundleUpdate(item,'level','name',e.currentTarget.value)
                    }
                  />
                </div>
                <div className='pb-1'>
                  <TextField
                    fullWidth
                    label="レベライズの数値 因子"
                    variant="outlined"
                    value={item.valueLevel}
                    onChange={(e) =>
                      hundleUpdate(item,'level','valueLevel',e.currentTarget.value)
                    }
                  />
                </div>
              </div>
            )}
            <Button onClick={() => hundleListAdd('level')}><AddCircleOutlineIcon /></Button>
          </div>
          <div className="field pb-2">
            {goalNumList.map((item) => (
              <div className="field-items">
                <div className='pb-1'>
                  <TextField
                    fullWidth
                    label="目的の数値 ネーム"
                    variant="outlined"
                    value={item.name}
                    onChange={(e) =>
                      hundleUpdate(item,'goal','name',e.currentTarget.value)
                    }
                  />
                </div>
                <div className='pb-1'>
                  <TextField
                    fullWidth
                    label="目的の数値 因子"
                    className='mb-1'
                    variant="outlined"
                    value={item.valueLevel}
                    onChange={(e) =>
                      hundleUpdate(item,'goal','valueLevel',e.currentTarget.value)
                    }
                  />
                </div>
              </div>
            ))}
            <Button onClick={() => hundleListAdd('goal')}><AddCircleOutlineIcon /></Button>
          </div>
          <div className="field pb-2">
            <Typography gutterBottom>概念レベル (定義数値 / ぶれ幅)</Typography>
            <Typography variant="h5" gutterBottom>
            </Typography>
          </div>
          <div className="field">
            <Button onClick={() => handleModalClose()}>閉じる</Button>
            {editType === 'create' ? (
              <Button variant="contained" onClick={() => handleAdd()}>追加</Button>
            ) : (
              <Button variant="contained" onClick={() => handleModalSave()}>更新</Button>
            )}
          </div>
        </div>
      </div>
    </Box>
  )
}
export default EditQuantify
