import { Button } from '@/components/atoms';
import axiosInstance from '@/services/restaurantAPI';
import { useEffect, useState } from 'react';
import styles from './UserManagement.module.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  UserAddressId?: number | null;
  UserCreditCardId?: number | null;
}

interface EditedUser {
  id?: number; // Assuming you don't want to edit the ID
  firstName: string;
  lastName: string;
  email: string;
  UserAddressId?: number | null;
  UserCreditCardId?: number | null;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingModeIndex, setEditingModeIndex] = useState<number>(-1);
  const [editedUser, setEditedUser] = useState<EditedUser>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      const fetchedUsers: { users: User[] } = await response.data;
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
                  className={styles.edit_input}
                  type="text"
                  value={editedUser.firstName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, firstName: e.target.value })
                  }
                />
              ) : (
                user.firstName
              )}
            </td>
            <td>
              {editingModeIndex === index ? (
                <input
                  type="text"
                  className={styles.edit_input}
                  value={editedUser.lastName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, lastName: e.target.value })
                  }
                />
              ) : (
                user.lastName
              )}
            </td>
            <td>
              {editingModeIndex === index ? (
                <input
                  type="text"
                  className={styles.edit_input}
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
                <div className={styles.action_container}>
                  <Button variant="outlined" onClick={() => handleSaveUser()}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </div>
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
