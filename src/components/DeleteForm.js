import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from './Button';
import { Modal } from './Modal';
import { DB_URL } from '../config';

export const DeleteForm = (props) => {
  const { deleteId } = props;
  const list = useSelector((state) => state.list);
  const targetItem = list.find((item) => item.id === deleteId);
  // const deleteIndex = useSelector(state => state.deleteIndex);

  const dispatch = useDispatch();
  const deleteItem = () => {
    const newList = list.filter((item) => item.id !== deleteId);
    axios.put(`${DB_URL}todo.json`, newList).then((res) => {
      dispatch({
        type: 'DELETE_ITEM_SUCCESS',
        payload: res.data,
      });
    });
  };
  const cancelDeleteItem = () => {
    dispatch({
      type: 'EDELETE_ITEM_CANCEL',
    });
  };

  return (
    <div className="deleteForm">
      <Modal
        onCloseModal={cancelDeleteItem}
        title={`'${targetItem.title}’の削除`}
      >
        <p className="text-sm text-center mt-4">削除しますか？</p>
        <div className="flex justify-center items-start mt-10">
          <Button onClick={deleteItem} clazz="-primary">
            OK
          </Button>
          <Button onClick={cancelDeleteItem} clazz="-normal">
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};
