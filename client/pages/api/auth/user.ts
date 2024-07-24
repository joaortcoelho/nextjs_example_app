export const getCurUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logoutHandler = () => {
  localStorage.clear();
  return 200;
};
