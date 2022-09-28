export const LoginStart = (user) => ({
  type: "LoginStart",
});

export const LoginSuccess = (user) => ({
  type: "LoginSuccess",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LoginFailure",
  payload: error,
});

export const follow = (userId) => ({
  type: "follow",
  payload: userId,
});
export const unfollow = (userId) => ({
  type: "unfollow",
  payload: userId,
});

