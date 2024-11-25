import React, { useContext, useEffect, useState } from 'react';
// import { MdDelete, MdEdit } from "react-icons/md";
// import './Products.css';
// import AddProduct from './AddProduct';
// import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import EditUserSs from './EditUserSsh';
import { GeneralContext } from '../App';


export default function Users() {
  const token = localStorage.getItem('x-auth-token');
    const [users, setUsers] = useState([]);
    const [userEdited, setUserEdited] = useState();
      const {setLoader} = useContext(GeneralContext);
  const [error, setError] = useState();


  useEffect(() => {
    const fetchCards = async () => {
      setLoader(true);
      try {
        const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchCards();
  }, [token]); // כאן אנחנו כוללים את token כ-dependency


    const removeUser = (id) => {
        if (!window.confirm('Are you sure you want to remove this product?')) {
            return; 
        }

        // fetch(`https://api.shipap.co.il/products/${id}`, {
        //     method: "DELETE",
        //     credentials: "include"
        // })
        // .then(() => {
        //     const updatedProducts = users.filter(product => product.id!== id);
        //     setUsers(updatedProducts);
        // })
        // .catch(error => console.error("Error deleting product:", error)); // לתפוס את השגיאה בעצמנו כדי שלא יציג את ההודעות האדומות על המסך 
    }

    const update = user => {
        if (user) {  
            const i = users.findIndex(x => x.id === user.id);
            user.splice(i, 1, user);

            setUsers([...user])
        }
        setUserEdited();
    }

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
                // onClick={() => handleEditClick(user)}
                onClick={() => setUserEdited(user)}
                >
                  <EditIcon />
                </IconButton>
                {/* <IconButton component={Link} to={`/auth/${user._Id}/edit`} color="primary">
                  <EditIcon />
                </IconButton> */}
                <IconButton color="error" onClick={() => removeUser(user._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    


     {/* דיאלוג עריכה */}
      {/* {selectedUser && (
        <EditUserDialog
          open={openEditDialog}
          onClose={handleDialogClose}
          user={selectedUser}
          onSave={handleSave}
        />
      )} */}

      <EditUserSs user={userEdited} userChange = {update}/>
    </>
    
    )
}
