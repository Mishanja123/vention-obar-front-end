import { Button } from '@/components/atoms';
import axiosInstance from '@/services/restaurantAPI';
import { useEffect, useState } from 'react';
import styles from './UserManagement.module.css';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  UserAddressId?: number | null;
  UserCreditCardId?: number | null;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      const fetchedUsers: { users: User[] } = await response.data;
      console.log(fetchedUsers);
      setUsers(fetchedUsers.users);
    } catch (error) {
      console.log('Ooops, looks like there is an error ' + error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <table className={styles.users_table}>
      <thead>
        <tr>
          <th>No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Delivery Address</th>
          <th>Payments Info</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.UserAddressId ? 'null' : 'None'}</td>
            <td>{user.UserCreditCardId ? 'null' : 'None'}</td>
            <td>
              <Button variant="outlined">Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserManagement;
