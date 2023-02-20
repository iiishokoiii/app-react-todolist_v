import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchListAction, fetchListSuccessAction, fetchListFailAction, updateEditFlgAction, updateDeleteFlgAction, updateAddFlgAction } from '../action';
import { AddForm } from './AddForm';
import { EditForm } from './EditForm';
import { DeleteForm } from './DeleteForm';
import { IconButton } from './module/IconButton';
import { FetchErrorMsg } from './module/FetchErrorMsg';
import { DB_URL } from '../config';
import loading from '../images/loading.gif';

const List = () => {
  const list = useSelector((state) => state.list);
  const editFlg = useSelector((state) => state.editFlg);
  const deleteFlg = useSelector((state) => state.deleteFlg);
  const addFlg = useSelector((state) => state.addFlg);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [fetchErrFlg, setFetchErrFlg] = useState(false);
  const [fetchTimeoutFlg, setFetchTimeoutFlg] = useState(false);

  useEffect(() => {
    dispatch(fetchListAction());
    axios
      .get(`${DB_URL}todo.json`, {timeout: 3000})
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        const _arr = res.data
          .filter((item) => !!item)
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          });
        dispatch(fetchListSuccessAction(_arr));
      })
      .catch((error) => {
        console.log(error);
        setFetchErrFlg(true);
        setFetchTimeoutFlg(error.code === 'ECONNABORTED');
        dispatch(fetchListFailAction());
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

  const setStyle = (checked) => (checked ? 'color-grey-200' : 'color-grey-400');

  return (
    <div className="relative bg-gray-50 px-4 pt-6 pb-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-96 flex-col">
          <p className="mb-3">
            <img src={loading} alt="Logo" width="48" />
          </p>
          <p className="">loading</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {fetchErrFlg ? (
            <div className="flex justify-center items-center h-96 flex-col text-center">
              <FetchErrorMsg fetchTimeoutFlg={fetchTimeoutFlg}/>
            </div>
          ) : (
            <>
              <ul className="">
                {list.map((item) => (
                  <li data-checked={item.checked ? 'true' : 'false'} className="flex items-center py-2 mb-1 border-b border-grey-500 text-sm bg-white" key={item.id}>
                    <div className={`px-4 w-5/6 font-normal ${setStyle(item.checked)}`}>
                      <p>{item.title}</p>
                    </div>
                    <div className="flex w-1/10 items-center">
                      {/* <Button onClick={() => handleEditItem(item.id)} clazz="-primary">edit</Button>
                <Button onClick={() => handleDeleteItem(item.id)} clazz="-primary">delete</Button> */}
                      <IconButton onClick={() => handleEditItem(item.id)} svgname="edit" clazz="-normal">
                        edit
                      </IconButton>
                      <IconButton onClick={() => handleDeleteItem(item.id)} svgname="delete" clazz="-normal">
                        delete
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
              {!addFlg && (
                <div className="flex justify-center mt-3">
                  <IconButton onClick={addItem} svgname="add" clazz="-primary">
                    Add
                  </IconButton>
                </div>
              )}
              {addFlg && <AddForm />}
              {editFlg && <EditForm editId={editId} />}
              {deleteFlg && <DeleteForm deleteId={deleteId} />}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
