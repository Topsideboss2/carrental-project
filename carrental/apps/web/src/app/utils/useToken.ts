// get  the user data from session storage
export const getUser = () => {
  const userStr = localStorage.getItem('@carrental-user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};
// get user id
export const getUserId = () => {
  const userStr = localStorage.getItem('authuser');
  if (userStr) {
    return JSON.parse(userStr).id;
  } else return console.log('no active user id found');
};
// return tocken from session storage
export const getToken = () => {
  return localStorage.getItem('@carretal-auth') || null;
};
// get company
export const getCompany = () => {
  return localStorage.getItem('activeCompany') || null;
};
// getProjectName
export const getProjectName = () => {
  return localStorage.getItem('projetName') || null;
};

// remove the token and user from session
export const removeUserSession = () => {
  localStorage.removeItem('@carrental-auth');
  localStorage.removeItem('@carrental-user');
};

// set the token and user from session
export const setUserSession = (token: string , user = { name: 'name' }) => {
  localStorage.setItem('@carrental-auth', token);
  localStorage.setItem('@carrental-user', JSON.stringify(user));
};

// save all user Permission to localStoreage

export const getPermissions = () => {
  return localStorage.getItem('userpermissions') || null;
};
// remove permissions from local storage
export const removePermissions = () => {
  localStorage.removeItem('userpermissions');
};
export const setUserPermission = (permissions = []) => {
  localStorage.setItem('userpermissions', JSON.stringify(permissions));
};
