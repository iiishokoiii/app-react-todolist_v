import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  fetchListAction,
  fetchListSuccessAction,
  updateEditFlgAction,
  updateDeleteFlgAction,
  updateAddFlgAction,
} from '../action';
import { AddForm } from './AddForm';
import { EditForm } from './EditForm';
import { DeleteForm } from './DeleteForm';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { DB_URL } from '../config';

const List = () => {
  const list = useSelector((state) => state.list);
  const editFlg = useSelector((state) => state.editFlg);
  const deleteFlg = useSelector((state) => state.deleteFlg);
  const addFlg = useSelector((state) => state.addFlg);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchListAction());
    axios.get(`${DB_URL}todo.json`).then((res) => {
      const _arr = res.data.filter((item) => !!item);
      dispatch(fetchListSuccessAction(_arr));
    });
  }, []);

  const handleEditItem = (id) => {
    if (editFlg || deleteFlg) return;
    setEditId(id);
    dispatch(updateEditFlgAction(true));
  };
  const handleDeleteItem = (id) => {
    if (editFlg || deleteFlg) return;
    setDeleteId(id);
    dispatch(updateDeleteFlgAction(true));
  };
  const addItem = () => {
    if (editFlg) return;
    dispatch(updateAddFlgAction(true));
  };

  const setStyle = (checked) =>
    checked ? 'bg-grey border border-grey-500' : 'bg-white drop-shadow-sm ';

  return (
    <div className="bg-gray-50 relative">
      {isLoading ? (
        <p>...loading</p>
      ) : (
        <ul className="mb-4 px-4 py-2">
          {list.map((item) => (
            <li
              data-checked={item.checked ? 'true' : 'false'}
              className="flex my-4 max-w-2xl mx-auto text-sm"
              key={item.id}
            >
              <div
                className={`px-4 py-2 w-5/6 bg-white font-normal rounded-md ${setStyle(
                  item.checked,
                )}`}
              >
                {item.title}
              </div>
              <div className="flex w-1/10 items-center">
                <Button
                  onClick={() => handleEditItem(item.id)}
                  clazz="-primary"
                >
                  edit
                </Button>
                <Button
                  onClick={() => handleDeleteItem(item.id)}
                  clazz="-primary"
                >
                  delete
                </Button>
                {/* <IconButton onClick={() => handleEditItem(i)} clazz='-edit'>edit</IconButton>
              <IconButton onClick={() => handleDeleteItem(i)} clazz='-delete'>delete</IconButton> */}
              </div>
            </li>
          ))}
        </ul>
      )}

      {addFlg ? (
        <AddForm />
      ) : (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <IconButton onClick={addItem} clazz="-add">
            Add
          </IconButton>
        </div>
      )}

      {editFlg ? <EditForm editId={editId} /> : ''}
      {deleteFlg ? <DeleteForm deleteId={deleteId} /> : ''}
    </div>
  );
};

export default List;
