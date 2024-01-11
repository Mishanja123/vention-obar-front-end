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

interface EditedUser {
  id?: number; // Assuming you don't want to edit the ID
  first_name: string;
  last_name: string;
  email: string;
  UserAddressId?: number | null;
  UserCreditCardId?: number | null;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingModeIndex, setEditingModeIndex] = useState<number>(-1);
  const [editedUser, setEditedUser] = useState<EditedUser>({
    first_name: '',
    last_name: '',
    email: '',
  });

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
  const handleEditMode = (index: number) => {
    if (editingModeIndex === index) {
      setEditingModeIndex(-1);
    } else {
      setEditingModeIndex(index);
      setEditedUser(users[index]);
    }
  };

  const handleSaveUser = async () => {
    try {
      const response = await axiosInstance.patch(
        `/users/${editedUser.id}`,
        editedUser,
      );

      const updatedUser: User = response.data;
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );

      setEditingModeIndex(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      const data = await response.data;
      console.log(data);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

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
            <td>
              {editingModeIndex === index ? (
                <input
                  type="text"
                  value={editedUser.first_name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, first_name: e.target.value })
                  }
                />
              ) : (
                user.first_name
              )}
            </td>
            <td>
              {editingModeIndex === index ? (
                <input
                  type="text"
                  value={editedUser.last_name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, last_name: e.target.value })
                  }
                />
              ) : (
                user.last_name
              )}
            </td>
            <td>
              {editingModeIndex === index ? (
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              ) : (
                user.email
              )}
            </td>
            <td>{user.UserAddressId ? 'null' : 'None'}</td>
            <td>{user.UserCreditCardId ? 'null' : 'None'}</td>
            <td>
              {editingModeIndex === index ? (
                <>
                  <Button variant="outlined" onClick={() => handleSaveUser()}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => handleEditMode(index)}>
                  Edit
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserManagement;
