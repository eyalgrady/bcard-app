import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const EditUserDialog = ({ open, onClose, user, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedUser({
    //         ...editedUser,
    //         [name]: value,
    //     });
    // };

    const handleInputChange = async (e) => {
        const { name, value, type, checked } = e.target;
        let updatedFormData;

        if (name in editedUser) {
            // עידכון שדות ברמת העדכון הראשי
            updatedFormData = { ...editedUser, [name]: type === 'checkbox' ? checked : value };
        } else if (name.startsWith('name.')) {
            // עידכון שדות ב-name
            const nameField = name.split('.')[1];
            updatedFormData = {
                ...editedUser,
                name: { ...editedUser.name, [nameField]: value }
            };
        } else if (name.startsWith('image.')) {
            // עידכון שדות ב-image
            const imageField = name.split('.')[1];
            updatedFormData = {
                ...editedUser,
                image: { ...editedUser.image, [imageField]: value }
            };
        } else if (name.startsWith('address.')) {
            // עידכון שדות ב-address
            const addressField = name.split('.')[1];
            updatedFormData = {
                ...editedUser,
                address: { ...editedUser.address, [addressField]: value }
            };
        } else {
            // אם השדה לא נמצא, נניח שהוא מחוץ לטווח הסביר
            updatedFormData = editedUser;
        }

        // עדכון הנתונים
        setEditedUser(updatedFormData);

        // // ביצוע הוולידציה
        // const { error } = userSchema.validate(updatedFormData, { abortEarly: false });
        
        // const newErrors = {};

        // if (error) {
        //     error.details.forEach(({ context: { key }, message }) => {
        //         newErrors[key] = message;
        //     });
        // }

        // setErrors(newErrors);
    };

    const handleSave = () => {
        onSave(editedUser);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="name.first"
                    value={editedUser.name.first}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Middle Name"
                    name="name.middle"
                    value={editedUser.name.middle}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="name.last"
                    value={editedUser.name.last}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Address"
                    name="address.street"
                    value={editedUser.address.street}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="House Number"
                    name="address.houseNumber"
                    value={editedUser.address.houseNumber}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="City"
                    name="address.city"
                    value={editedUser.address.city}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Country"
                    name="address.country"
                    value={editedUser.address.country}
                    onChange={handleInputChange}/>
                <TextField 
                    margin="normal"
                    fullWidth
                    label="State"
                    name="address.state"
                    value={editedUser.address.state}
                    onChange={handleInputChange}/>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Zip Code"
                    name="address.zipCode"
                    value={editedUser.address.zip}
                    onChange={handleInputChange}/>
                <FormControlLabel
                    control={<Checkbox 
                    value={editedUser.isBusiness} 
                    onChange={handleInputChange }
                    name="isBusiness" 
                    checked={editedUser.isBusiness}>Business</Checkbox>} 
                    label="Signup as Business"/>
                <FormControlLabel
                    control={<Checkbox
                    value={editedUser.isAdmin}
                    onChange={handleInputChange}
                    name="isAdmin"
                    checked={editedUser.isAdmin}
                    >Admin</Checkbox>}
                    label="Signup as Admin"/>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserDialog;
