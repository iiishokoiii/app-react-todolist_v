export const fetchListAction = () => ({
  type: 'FETCH_LIST',
});
export const fetchListSuccessAction = (listArr) => ({
  type: 'FETCH_LIST_SUCCESS',
  payload: listArr,
});
export const updateEditFlgAction = (flg) => ({
  type: 'UPDATE_EDIT_FLG',
  payload: flg,
});
export const updateDeleteFlgAction = (flg) => ({
  type: 'UPDATE_DELETE_FLG',
  payload: flg,
});
export const updateAddFlgAction = (flg) => ({
  type: 'UPDATE_ADD_FLG',
  payload: flg,
});
