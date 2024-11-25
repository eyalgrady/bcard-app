import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import EditUserDialog from './EditUserDialog';
import { GeneralContext } from '../App';

const Users = () => {
  const token = localStorage.getItem('x-auth-token');
  const [users, setUsers] = useState([]);
  const {setLoader} = useContext(GeneralContext);
  const [error, setError] = useState();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(()=> {
    const fetchCards = async() => {
      setLoader(true)
      try {
        axios.defaults.headers.common['x-auth-token'] = token;
        const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users');
        setUsers(response.data);
      } catch(error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoader(false)

      }
    } 
        fetchCards();
  }, [token, setLoader])

  const handleDelete = (userId) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    // כאן אפשר להוסיף לוגיקה למחיקת המשתמש
    console.log(`Delete user with ID: ${userId}`);
  }
};

  const handleEditClick = (user) => {
    setSelectedUser(user); // update selected user
    setOpenEditDialog(true); // open the edit dialog
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleSave = async (editedUser) => {
    try {
      axios.defaults.headers.common['x-auth-token'] = token;


      await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${editedUser._id}`, editedUser);
      setUsers(users.map(user => (user._id === editedUser._id ? editedUser : user)));

      handleDialogClose();
      
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (error) return <div>Error {error}</div>;
  if (!users) return <div>No users</div>;

  return (
    <>
    <TableContainer component={Paper}
      sx={{
        maxWidth: '100%',  // רוחב מירבי של 100% מהעמוד
        overflow: 'hidden', // מניעת גלילה אופקית
                overflowX: 'auto', // הוספת גלילה אופקית אם יש צורך

        marginBottom: 2,   // רווח תחתון
      }}>
      <Table sx={{
          minWidth: 'auto', // הגדרת רוחב מינימלי לטבלה אוטומטית
          tableLayout: 'fixed', // מאפשר שליטה על רוחב העמודות
        }}>
        <TableHead sx={{
            // backgroundColor: '#1976d2',
            backgroundColor: '#868d93',
            '& th': {
              fontWeight: 'bold', // הפיכת הטקסט בכותרות לבולט
              fontSize: '1.1rem', // הגדלת גודל הטקסט בכותרות
              textAlign: 'center', // יישור טקסט למרכז
              padding: '16px', // הוספת ריפוד
            },
          }}>
          <TableRow>
            <TableCell sx={{ width: '20%', color: 'white' }}>Name</TableCell>
            <TableCell sx={{ width: '15%', color: 'white' }}>Phone</TableCell>
            <TableCell sx={{ width: '20%', color: 'white' }}>Email</TableCell>
            <TableCell sx={{ width: '25%', color: 'white' }}>Address</TableCell>
            <TableCell sx={{ width: '10%', color: 'white' }}>isAdmin</TableCell>
            <TableCell sx={{ width: '10%', color: 'white' }}>isBusiness</TableCell>
            <TableCell sx={{ width: '15%', color: 'white' }}>createdAt</TableCell>
            <TableCell sx={{ width: '10%', color: 'white' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}
            sx={{
                '&:nth-of-type(even)': {
                  backgroundColor: '#fafafa', // צבע רקע עבור שורות זוגיות
                },
                '&:hover': {
                  backgroundColor: '#e0e0e0', // צבע רקע כשמעבירים את הסמן מעל שורה
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // הוספת צל לשורות ב-hover
                },
              }}>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'  }}>{user.name.first} {user.name.middle} {user.name.last}</TableCell>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'  }}>{user.phone}</TableCell>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'  }}>{user.email}</TableCell>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'  }}>
                {user.address.street} {user.address.houseNumber}, {user.address.city}, {user.address.country}, {user.address.state}
              </TableCell>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'  }}>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'  }}>{user.isBusiness ? 'Yes' : 'No'}</TableCell>
              <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center'  }}>{moment(user.createdAt).format('DD/MM/YYYY HH:MM')}</TableCell>
              <TableCell sx={{ display:'flex', justifyContent: 'center'}}>
                <IconButton color="primary"  
                onClick={() => handleEditClick(user)}>
                  <EditIcon />
                </IconButton>
                {/* <IconButton component={Link} to={`/auth/${user._Id}/edit`} color="primary">
                  <EditIcon />
                </IconButton> */}
                <IconButton color="error" onClick={() => handleDelete(user._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    


     {/* דיאלוג עריכה */}
      {selectedUser && (
        <EditUserDialog
          open={openEditDialog}
          onClose={handleDialogClose}
          user={selectedUser}
          onSave={handleSave}
        />
      )}

    </>
    
    )
}

export default Users