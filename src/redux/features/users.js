const initialState = {
  items: [],
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "users/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "users/delete/pending":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              deleting: true,
            };
          }
          return item;
        }),
      };
    case "users/delete/fulfilled":
      return {
        ...state,
        items: state.items.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
          return null;
        }),
      };
    default:
      return state;
  }
};

export const loadUsers = () => {
  return (dispatch) => {
    dispatch({
      type: "users/load/pending",
    });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "users/load/fulfilled",
          payload: data,
        });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch({
      type: "users/delete/pending",
      payload: id,
    });
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "users/delete/fulfilled",
          payload: id,
        });
      });
  };
};
