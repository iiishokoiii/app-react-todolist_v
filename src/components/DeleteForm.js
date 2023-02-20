import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchListSuccessAction, updateDeleteFlgAction } from '../action';
import { Button } from './module/Button';
import { Modal } from './module/Modal';
import { FetchErrorMsg } from './module/FetchErrorMsg';
import { DB_URL } from '../config';

export const DeleteForm = (props) => {
  const { deleteId } = props;
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  const targetItem = list.find((item) => item.id === deleteId);

  const [fetchErrFlg, setFetchErrFlg] = useState(false);
  const [fetchTimeoutFlg, setFetchTimeoutFlg] = useState(false);

  const deleteItem = () => {
    const newList = list.filter((item) => item.id !== deleteId);
    axios
      .put(`${DB_URL}todo.json`, newList, { timeout: 3000 })
      .then((res) => {
        dispatch(fetchListSuccessAction(res.data));
        dispatch(updateDeleteFlgAction(false));
      })
      .catch((error) => {
        console.log(error);
        setFetchErrFlg(true);
        setFetchTimeoutFlg(error.code === 'ECONNABORTED');
      });
  };
  const cancelDeleteItem = () => {
    dispatch(updateDeleteFlgAction(false));
  };

  return (
    <div className="deleteForm">
      <Modal onCloseModal={cancelDeleteItem} title={`'${targetItem.title}’の削除`}>
        {fetchErrFlg ? (
          <>
            <FetchErrorMsg fetchTimeoutFlg={fetchTimeoutFlg} />
            <div className="flex justify-center mt-4">
              <Button onClick={cancelDeleteItem} clazz="-normal">OK</Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-center mt-4">削除しますか？</p>
            <div className="flex justify-center items-start mt-10">
              <Button onClick={deleteItem} clazz="-primary">OK</Button>
              <Button onClick={cancelDeleteItem} clazz="-normal">Cancel</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
