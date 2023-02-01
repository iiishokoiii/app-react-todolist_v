const initialState = {
  list: [],
  editFlg: false,
  deleteFlg: false,
  addFlg: false,
  isLoading: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_LIST': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'FETCH_LIST_SUCCESS': {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    }
    case 'UPDATE_EDIT_FLG': {
      return {
        ...state,
        editFlg: action.payload,
        // editIndex: action.payload,
      };
    }
    case 'UPDATE_DELETE_FLG': {
      return {
        ...state,
        deleteFlg: action.payload,
        // editIndex: action.payload,
      };
    }
    case 'UPDATE_ADD_FLG': {
      return {
        ...state,
        addFlg: action.payload,
      };
    }
    default:
      return state;
  }
}
