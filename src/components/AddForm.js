import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from './Button';
import { Modal } from './Modal';
import { TextInput } from './TextInput';
import { DB_URL } from '../config';

export const AddForm = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

  const addItem = (newTitle, newId) => {
    const newItem = { id: newId, title: newTitle, checked: false };
    return axios
      .put(DB_URL + 'todo/' + newId + '.json', newItem)
      .then(() => {
        dispatch({
          type: 'ADD_ITEM_SUCCESS',
          payload: newItem,
        });
      })
      .catch(() => {
        dispatch({
          type: 'ADD_ITEM_CANCEL',
        });
      });
  };
  const cancelAddItem = () => {
    dispatch({
      type: 'ADD_ITEM_CANCEL',
    });
  };

  const [tmpText, updateTmpText] = useState('');
  const [isNoText, setIsNoText] = useState(false);
  const handleAddItem = () => {
    if (!tmpText) {
      setIsNoText(true);
      return;
    }
    const newId = Number(list.sort((a, b) => b.id - a.id)[0].id) + 1;
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
        {isNoText
          ? '<p className="text-center mt-4">入力されていません</p>'
          : ''}
      </Modal>
    </div>
  );
};
