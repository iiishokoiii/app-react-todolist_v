import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchListSuccessAction, updateAddFlgAction } from '../action';
import { Button } from './module/Button';
import { Modal } from './module/Modal';
import { TextInput } from './module/TextInput';
import { DB_URL } from '../config';
import { geteDateStr } from '../utility';

export const AddForm = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

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
      .put(`${DB_URL}todo.json`, newList)
      .then((res) => {
        dispatch(fetchListSuccessAction(res.data));
        dispatch(updateAddFlgAction(false));
      })
      .catch(() => {
        dispatch(updateAddFlgAction(false));
      });
  };
  const cancelAddItem = () => {
    dispatch(updateAddFlgAction(false));
  };

  const [tmpText, updateTmpText] = useState('');
  const [errFlg, setErrFlg] = useState(false);
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
        {errFlg ? <p className="text-center mt-4">入力されていません</p> : ''}
      </Modal>
    </div>
  );
};
