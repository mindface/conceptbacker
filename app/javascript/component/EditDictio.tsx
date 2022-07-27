import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

import { Dictio } from '../type/dictio'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../store/index'
import {
  AddDictioData,
  UpdateDictioData,
  DeletePostData,
} from '../store/modules/data_action/dictio'
import { setLeveler } from '../lib/setCalc'

type Props = {
  item: Dictio
  editType: string
  editId?: number
  handleModalClose: () => void
}

function EditDictio(props: Props) {
  const { item, editType, editId, handleModalClose } = props
  const dispatch = useDispatch<AppDispatch>()

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
  const [dictioPlan, dictioPlanSet] = useState<number | number[]>(0)
  const [dictioImplementation, dictioImplementationSet] = useState<
    number | number[]
  >(0)
  const [dictioResult, dictioResultSet] = useState<number | number[]>(0)
  const [dictioIssue, dictioIssueSet] = useState<number | number[]>(0)
  const [dictioVariance, dictioVarianceSet] = useState<number | number[]>(0)
  const [dictioAchieve, dictioAchieveSet] = useState<number | number[]>(0)

  const setNumber = () => {
    const _dictioResult = dictioResult as number
    const _dictioAchieve = dictioAchieve as number
    if (_dictioAchieve === 0 || _dictioResult === 0) return 0
    const result = Math.ceil((_dictioAchieve / _dictioResult) * 100)
    return result
  }

  const reDataAction = () => {
    console.log(dictio)
    const text = dictio.disc
    
  }


  const handleModalSave = () => {
    const sendData = {
      id: editId,
      title: dictio.title,
      user_id: 'user_id',
      disc: dictio.disc,
      env: dictio.env,
      levelise: `${dictioPlan}|${dictioImplementation}|${dictioResult}`,
      goal: `${dictioIssue}|${dictioVariance}|${dictioAchieve}`,
      rate: setNumber(),
    }
    if (editType === 'create') {
      delete sendData.id
      dispatch(AddDictioData(sendData))
    } else {
      dispatch(UpdateDictioData(sendData))
    }
    handleModalClose()
  }

  const hundleDelete = () => {
    dispatch(DeletePostData(editId!))
    handleModalClose()
  }

  useEffect(() => {
    if (editType === 'edit') {
      dictioSet(item)
      const leveliseList = item.levelise.split('|')
      const goalList = item.goal.split('|')
      if(leveliseList[0] === '') {
        dictioPlanSet(0)
        dictioImplementationSet(0)
        dictioResultSet(0)
      }else {
        dictioPlanSet(Number(leveliseList[0]))
        dictioImplementationSet(Number(leveliseList[1]))
        dictioResultSet(Number(leveliseList[2]))
      }
      if(goalList[0] === '' ){
        dictioIssueSet(0)
        dictioVarianceSet(0)
        dictioAchieveSet(0)
      }else {
        dictioIssueSet(Number(goalList[0]))
        dictioVarianceSet(Number(goalList[1]))
        dictioAchieveSet(Number(goalList[2]))
      }
    }
  }, [editType, item])

  useEffect(() => {
    if (editType === 'create') {
      dictioSet({
        title: '',
        user_id: '',
        disc: '',
        env: '',
        levelise: '',
        goal: '',
        rate: 0,
        id: 0,
      })
    }
  }, [editType])

  return (
    <Box className="disc-box m-4 p-1 bg-w-c box-shadow radius">
      {editType === 'delete' ? (
        <div className="disc p-4">
          <h4 className="caption pb-2">この操作は消せません。削除しますか。</h4>
          <div className="fields">
            <Button onClick={() => handleModalClose()}>閉じる</Button>
            <Button onClick={() => hundleDelete()} color="error" >削除</Button>
          </div>
        </div>
      ) : (
        <div className="disc p-4">
          <h4 className="caption pb-2">詳細と前提</h4>
          <div className="fields">
            <div className="field pb-2">
              <Typography gutterBottom>title</Typography>
              <TextField
                fullWidth
                label="タイトル"
                variant="outlined"
                value={dictio.title}
                onChange={(e) =>
                  dictioSet({ ...dictio, title: e.currentTarget.value })
                }
              />
            </div>
            <div className="field pb-2">
              <Typography gutterBottom>disc</Typography>
              <TextField
                fullWidth
                label="詳細"
                variant="outlined"
                value={dictio.disc}
                onChange={(e) =>
                  dictioSet({ ...dictio, disc: e.currentTarget.value })
                }
              />
            </div>
            <div className="field pb-2">
              <Typography gutterBottom>env</Typography>
              <TextField
                fullWidth
                label="環境"
                variant="outlined"
                value={dictio.env}
                onChange={(e) =>
                  dictioSet({ ...dictio, env: e.currentTarget.value })
                }
              />
            </div>
            <div className="field pb-2">
              <Typography gutterBottom>計画の立案数 levelise</Typography>
              <Slider
                defaultValue={30}
                max={200}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={dictioPlan}
                onChange={(e: Event, newValue: number | number[]) =>
                  dictioPlanSet(newValue)
                }
              />
              <Typography gutterBottom>計画の立案数 - 経験(回数)</Typography>
              <Slider
                defaultValue={30}
                max={200}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={dictioImplementation}
                onChange={(e: Event, newValue: number | number[]) =>
                  dictioImplementationSet(newValue)
                }
              />
              <Typography gutterBottom>計画の立案数 - 検証数</Typography>
              <Slider
                defaultValue={0}
                max={200}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={dictioResult}
                onChange={(e: Event, newValue: number | number[]) =>
                  dictioResultSet(newValue)
                }
              />
            </div>
            <div className="field pb-2">
              <Typography gutterBottom>目的レベル - 問題数　goal</Typography>
              <Slider
                defaultValue={30}
                max={200}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={dictioIssue}
                onChange={(e: Event, newValue: number | number[]) =>
                  dictioIssueSet(newValue)
                }
              />

              <Typography gutterBottom>
                目的レベル - 最終目的と細分化項目数
              </Typography>
              <Slider
                defaultValue={30}
                max={200}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={dictioVariance}
                onChange={(e: Event, newValue: number | number[]) =>
                  dictioVarianceSet(newValue)
                }
              />

              <Typography gutterBottom>目的レベル - 達成数</Typography>
              <Slider
                defaultValue={30}
                max={200}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={dictioAchieve}
                onChange={(e: Event, newValue: number | number[]) =>
                  dictioAchieveSet(newValue)
                }
              />
            </div>
            <div className="field pb-2">
              <Typography gutterBottom>rate (検証数 / 達成数)</Typography>
              <Typography variant="h5" gutterBottom>
                {setNumber()}%
              </Typography>
            </div>
            <div className="field">
              <Button onClick={() => reDataAction()}>reDataAction</Button>
              <Button onClick={() => handleModalClose()}>閉じる</Button>
              {editType === 'create' ? (
                <Button onClick={() => handleModalSave()}>追加</Button>
              ) : (
                <Button onClick={() => handleModalSave()}>更新</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Box>
  )
}
export default EditDictio
