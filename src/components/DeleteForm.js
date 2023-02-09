import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchListSuccessAction, updateDeleteFlgAction } from '../action';
import { Button } from './module/Button';
import { Modal } from './module/Modal';
import { DB_URL } from '../config';

export const DeleteForm = (props) => {
  const { deleteId } = props;
  const list = useSelector((state) => state.list);
  const targetItem = list.find((item) => item.id === deleteId);

  const [fetchErrFlg, setFetchErrFlg] = useState(false);

  const dispatch = useDispatch();
  const deleteItem = () => {
    const newList = list.filter((item) => item.id !== deleteId);
    axios
      .put(`${DB_URL}todo.json`, newList)
      .then((res) => {
        dispatch(fetchListSuccessAction(res.data));
        dispatch(updateDeleteFlgAction(false));
      })
      .catch(() => {
        setFetchErrFlg(true);
      });
  };
  const cancelDeleteItem = () => {
    dispatch(updateDeleteFlgAction(false));
  };

  return (
    <div className="deleteForm">
      <Modal onCloseModal={cancelDeleteItem} title={`'${targetItem.title}’の削除`}>
        {!fetchErrFlg ? (
          <div>
            <p className="text-sm text-center mt-4">削除しますか？</p>
            <div className="flex justify-center items-start mt-10">
              <Button onClick={deleteItem} clazz="-primary">OK</Button>
              <Button onClick={cancelDeleteItem} clazz="-normal">Cancel</Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center mt-4">
              通信エラーです
              <br />
              しばらく待ってお試しください
            </p>
            <div className="flex justify-center mt-4">
              <Button onClick={cancelDeleteItem} clazz="-OK">OK</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
