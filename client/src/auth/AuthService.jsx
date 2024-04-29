import React from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';

export const AuthContext = React.createContext();

export const AuthStorage = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const cookies = new Cookies(null, { path: '/' });

  React.useEffect(() => {
    const localUser = cookies.get('user');
    if (localUser) setUser(jwtDecode(localUser));
  }, []);

  // React.useEffect(() => {
  //   if (user) window.localStorage.setItem('user', JSON.stringify(user));
  // }, [user]);

  const isLoggedIn = () => {
    return user !== null;
  };

  const getUserData = () => {
    return user;
  };

  const setUserData = (credential) => {
    setUser(jwtDecode(credential));
    cookies.set('user', credential);
  };

  const clearUserData = () => {
    setUser(null);
    cookies.remove('user');
  };

  const getUserPicture = () => {
    return user.picture;
  };

  const getUserName = () => {
    return user.name;
  };

  const getUserEmail = () => {
    return user.email;
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          getUserData,
          setUserData,
          clearUserData,
          getUserEmail,
          getUserName,
          getUserPicture,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
