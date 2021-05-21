export const initialState = {
  token: null,
  userId: null,
  email: null,
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        userId: action.user.userId,
        token: action.user.token,
      };

    case "REMOVE_USER":
      return {
        ...state,
        userId: null,
        token: null,
      };

    default:
      return {
        ...state,
      };
  }
};
