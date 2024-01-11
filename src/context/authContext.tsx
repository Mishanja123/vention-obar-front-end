import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance, {
  setAccessToken,
  unsetAccessToken,
} from '../services/restaurantAPI';

interface AuthContextProps {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserData) => Promise<void>;
  logOut: () => Promise<null>;
  loggedIn: boolean;
  response: unknown;
  isfetching: boolean;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [response, setResponse] = useState<unknown>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const loggedInStatus = localStorage.getItem('loggedIn') ?? false;
    if (loggedInStatus) {
      return JSON.parse(loggedInStatus);
    }
  });
  const [isfetching, setIsfetching] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const { data, headers } = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      setLoggedIn(true);
      const accessToken = headers.authorization.split(' ')[1];

      setAccessToken(accessToken);
      localStorage.setItem('token', JSON.stringify(accessToken));
      localStorage.setItem('loggedIn', 'true');
      setResponse(data);
      return data;
    } catch (error) {
      console.error(`Login Error: ${error}`);
    }
  };

  const register = async ({
    firstName,
    lastName,
    email,
    phone,
    password,
  }: UserData) => {
    try {
      const { data } = await axiosInstance.post('/auth/sign-up', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
      });

      setResponse(data);
      console.log(data);
    } catch (error) {
      console.error(`Registration Error: ${error}`);
    }
  };

  const logOut = async (): Promise<null> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data } = await axiosInstance.get('/auth/logout');
      setLoggedIn(false);

      localStorage.setItem('token', '');
      localStorage.setItem('loggedIn', 'false');

      unsetAccessToken();

      return null;
    } catch (error) {
      console.error(`Logout Error: ${error}`);
      return null;
    }
  };

  useEffect(() => {
    const handleCurrentUser = async () => {
      const token = localStorage.getItem('token');

      if (token && loggedIn) {
        setAccessToken(JSON.parse(token));
      }

      try {
        setIsfetching(true);
        const { data } = await axiosInstance.get('/auth/current-user');

        setIsfetching(true);
        setLoggedIn(true);
        setResponse(data);
      } catch (error) {
        console.error(`Registration Error: ${error}`);
      } finally {
        setIsfetching(false);
      }
    };

    handleCurrentUser();
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        loggedIn,
        logOut,
        response,
        isfetching,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
