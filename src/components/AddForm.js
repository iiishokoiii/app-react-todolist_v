import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchListSuccessAction, updateAddFlgAction } from '../action';
import { Button } from './module/Button';
import { Modal } from './module/Modal';
import { TextInput } from './module/TextInput';
import { FetchErrorMsg } from './module/FetchErrorMsg';
import { DB_URL } from '../config';
import { geteDateStr } from '../utility';

export const AddForm = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

  const [tmpText, updateTmpText] = useState('');
  const [errFlg, setErrFlg] = useState(false);
  const [fetchErrFlg, setFetchErrFlg] = useState(false);
  const [fetchTimeoutFlg, setFetchTimeoutFlg] = useState(false);

  const addItem = (newTitle, newId) => {
    const newItem = {
      id: newId,
      title: newTitle,
      checked: false,
      date: geteDateStr(),
    };
    const newList = [...list, newItem].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    return axios
      .put(`${DB_URL}todo.json`, newList, { timeout: 5 })
      .then((res) => {
        dispatch(fetchListSuccessAction(res.data));
        dispatch(updateAddFlgAction(false));
      })
      .catch((error) => {
        console.log(error);
        setFetchErrFlg(true);
        setFetchTimeoutFlg(error.code === 'ECONNABORTED');
      });
  };

  const cancelAddItem = () => {
    dispatch(updateAddFlgAction(false));
  };
  const handleAddItem = () => {
    if (!tmpText) {
      setErrFlg(true);
      return;
    }
    const newId = Number(list.sort((a, b) => b.id - a.id)[0].id) + 1; // 未使用のIDを設定
    addItem(tmpText, newId);
    updateTmpText('');
  };

  return (
    <div className="addForm">
      <Modal onCloseModal={cancelAddItem} title="アイテムの追加">
        {fetchErrFlg ? (
          <>
            <FetchErrorMsg fetchTimeoutFlg={fetchTimeoutFlg} />
            <div className="flex justify-center mt-4">
              <Button onClick={cancelAddItem} clazz="-normal">
                OK
              </Button>
            </div>
          </>
        ) : (
          <>
            <TextInput
              defaultValue={tmpText}
              onChange={(e) => {
                updateTmpText(e.currentTarget.value);
              }}
              onSubmit={handleAddItem}
            />
            <div className="flex justify-center items-start mt-4">
              <Button onClick={handleAddItem} clazz="-primary">
                OK
              </Button>
              <Button onClick={cancelAddItem} clazz="-normal">
                Cancel
              </Button>
            </div>
            {errFlg && <p className="text-center mt-4">入力されていません</p>}
          </>
        )}
      </Modal>
    </div>
  );
};
