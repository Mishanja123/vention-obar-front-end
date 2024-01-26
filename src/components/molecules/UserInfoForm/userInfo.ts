import axiosInstance from '@/services/restaurantAPI';

interface UserInfo {
  avatar: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface UserCredentials {
  password: string;
  role: string;
}

interface UserData {
  user: UserInfo;
  userCredentials: UserCredentials;
}

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/me');
    const userInfo: UserData = response.data;
    return userInfo;
  } catch (error) {
    console.error(error);
  }
};
