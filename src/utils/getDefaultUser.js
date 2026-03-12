import { jwtDecode } from 'jwt-decode';

export const getDefaultUser = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {};
  }
  const user = jwtDecode(token);
  if (new Date() > new Date(user.exp * 1000)) {
    localStorage.removeItem('token');
    return {};
  }
  return user;
};