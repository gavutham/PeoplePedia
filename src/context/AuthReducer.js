const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LoginStart":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LoginSuccess":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LoginFailure":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "follow":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "unfollow":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (id) => id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
