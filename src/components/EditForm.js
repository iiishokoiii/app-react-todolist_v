import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchListSuccessAction, updateEditFlgAction } from '../action';
import { Button } from './module/Button';
import { Modal } from './module/Modal';
import { TextInput } from './module/TextInput';
import { DB_URL } from '../config';

export const EditForm = (props) => {
  const { editId } = props;
  const list = useSelector((state) => state.list);
  const targetItem = list.find((item) => item.id === editId);

  const [tmpText, updateTmpText] = useState(targetItem.title);
  const [errFlg, setErrFlg] = useState(false);
  const [fetchErrFlg, setFetchErrFlg] = useState(false);

  const dispatch = useDispatch();
  const editItem = (itemTitle) => {
    const newItem = { ...targetItem, title: itemTitle };
    const newList = list.map((item) => (item.id === newItem.id ? newItem : item));
    return axios
      .put(`${DB_URL}todo.json`, newList)
      .then((res) => {
        dispatch(fetchListSuccessAction(res.data));
        dispatch(updateEditFlgAction(false));
      })
      .catch(() => {
        setFetchErrFlg(true);
      });
  };
  const cancelEditItem = () => {
    dispatch(updateEditFlgAction(false));
  };

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
      <Modal onCloseModal={cancelEditItem} title={`'${targetItem.title}'の編集`}>
        {!fetchErrFlg ? (
          <div>
            <TextInput
              defaultValue={tmpText}
              onChange={(e) => {
                updateTmpText(e.currentTarget.value);
              }}
              onSubmit={handleEditItem}
            />
            <div className="flex justify-center items-start mt-4">
              <Button onClick={handleEditItem} clazz="-primary">OK</Button>
              <Button onClick={cancelEditItem} clazz="-normal">Cancel</Button>
            </div>
            {errFlg && <p className="text-center mt-4">入力されていません</p>}
          </div>
        ) : (
          <div>
            <p className="text-center mt-4">
              通信エラーです
              <br />
              しばらく待ってお試しください
            </p>
            <div className="flex justify-center mt-4">
              <Button onClick={cancelEditItem} clazz="-OK">OK</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
