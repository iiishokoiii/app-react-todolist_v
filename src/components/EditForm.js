import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from './Button';
import { Modal } from './Modal';
import { TextInput } from './TextInput';
import { DB_URL } from '../config';

export const EditForm = (props) => {
  const { editId } = props;
  const list = useSelector((state) => state.list);
  const targetItem = list.find((item) => item.id === editId);

  const dispatch = useDispatch();
  const editItem = (itemTitle) => {
    const newItem = { ...targetItem, title: itemTitle };
    const newList = list.map((item) => {
      return item.id === newItem.id ? newItem : item;
    });
    return axios
      .put(`${DB_URL}todo.json`, newList)
      .then((res) => {
        dispatch({
          type: 'EDIT_ITEM_SUCCESS',
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: 'EDIT_ITEM_CANCEL',
        });
      });
  };
  const cancelEditItem = () => {
    dispatch({
      type: 'EDIT_ITEM_CANCEL',
    });
  };

  const [tmpText, updateTmpText] = useState(targetItem.title);
  const [errFlg, setErrFlg] = useState(false);
  const handleEditItem = () => {
    if (!tmpText) {
      setErrFlg(true);
      return;
    }
    editItem(tmpText);
    updateTmpText('');
  };

  return (
    <div className="editForm">
      <Modal
        onCloseModal={cancelEditItem}
        title={`'${targetItem.title}'の編集`}
      >
        <TextInput
          defaultValue={tmpText}
          onChange={(e) => {
            updateTmpText(e.currentTarget.value);
          }}
          onSubmit={handleEditItem}
        />
        <div className="flex justify-center items-start mt-4">
          <Button onClick={handleEditItem} clazz="-primary">
            OK
          </Button>
          <Button onClick={cancelEditItem} clazz="-normal">
            Cancel
          </Button>
        </div>
        {errFlg ? <p className="text-center mt-4">入力されていません</p> : ''}
      </Modal>
    </div>
  );
};
