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
    case 'EDIT_ITEM': {
      return {
        ...state,
        editFlg: true,
        // editIndex: action.payload,
      };
    }
    case 'DELETE_ITEM': {
      return {
        ...state,
        deleteFlg: true,
        // editIndex: action.payload,
      };
    }
    case 'ADD_ITEM': {
      return {
        ...state,
        addFlg: true,
      };
    }
    case 'ADD_ITEM_SUCCESS': {
      return {
        ...state,
        list: action.payload,
        addFlg: false,
      };
    }
    case 'EDIT_ITEM_SUCCESS': {
      return {
        ...state,
        list: action.payload,
        editFlg: false,
      };
    }
    case 'DELETE_ITEM_SUCCESS': {
      return {
        ...state,
        list: action.payload,
        deleteFlg: false,
      };
    }
    case 'ADD_ITEM_CANCEL': {
      return {
        ...state,
        addFlg: false,
      };
    }
    case 'EDIT_ITEM_CANCEL': {
      return {
        ...state,
        editFlg: false,
      };
    }
    case 'EDELETE_ITEM_CANCEL': {
      return {
        ...state,
        deleteFlg: false,
      };
    }
    default:
      return state;
  }
}
