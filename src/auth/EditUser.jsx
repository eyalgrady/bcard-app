import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, FormControlLabel, Button, Grid } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { GeneralContext } from '../App';
import useUserForm from '../hooks/useUserForm';
import { useParams } from 'react-router';

const EditUser = ({inUser}) => {
    const { user_id } = useParams();
    const [ user, setUser, handleChange, , , , , , ] = useUserForm(inUser);
    const [error, setError] = useState(null);
    const { setLoader } = useContext(GeneralContext)
    const token = localStorage.getItem('x-auth-token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;

    // useEffect(() => {
    //     if (inUser) {
    //         setUser(inUser);
    //     } else {
    //         setUser();
    //     }
    // }, [inUser])
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoader(true);
                axios.defaults.headers.common['x-auth-token'] = token;
                const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user', error);
                setError(`Error fetching card: ${error}`);
            } finally {
                setLoader(false);
            }
        };
        if (token) {
        fetchUser();
    }
    }, [setUser, setLoader, userId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { _id, ...userData } = user;
        // console.log(userData);
        console.log(user);
        

        try {
            setLoader(true);
            axios.defaults.headers.common['x-auth-token'] = token;

            // const { _id, ...userData } = user;

            await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, user);
            // navigate('/my-cards');
        } catch (error) {
            console.error('Error updating user', error);
            setError(`Error updating user: ${error.response.data}`);
        } finally {
            setLoader(false);
        }
    };
//     const handleSubmit = async (e) => {
//     e.preventDefault();

//     // הסרת שדה _id מהאובייקט אם קיים
//     const { _id, ...userData } = user;
//     console.log('Data to send:', userData);

//     try {
//         setLoader(true);
//         axios.defaults.headers.common['x-auth-token'] = token;

//         // שליחת הנתונים ללא שדה _id
//         await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, userData);
//         // navigate('/my-cards');
//     } catch (error) {
//         console.error('Error updating user', error);
//         setError(`Error updating user: ${error.response.data}`);
//     } finally {
//         setLoader(false);
//     }
// };


    if (error) return <div>Error: {error}</div>;

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='form_container p-5'>
                <h3 className='text-center mb-4'>Settings</h3>

                {user && (
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name *"
                                name="first"
                                // value={user.name.first}
                                value={user.name.first}
                                onChange={handleChange}
                                // error={!!errors.first}
                                // helperText={errors.first}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Middle Name"
                                name="middle"
                                // value={user.name.middle}
                                value={user.name.middle || ''}
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Last Name *"
                                name="last"
                                // value={user.name.last}
                                value={user.name.last || ''}
                                onChange={handleChange}
                                // error={!!errors.last}
                                // helperText={errors.last}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Phone *"
                                name="phone"
                                // value={user.phone}
                                value={user.phone || ''}
                                onChange={handleChange}
                                // error={!!errors.phone}
                                // helperText={errors.phone}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email *"
                                type="email"
                                name="email"
                                // value={user.email}
                                value={user.email || ''}
                                onChange={handleChange}
                                // error={!!errors.email}
                                // helperText={errors.email}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password *"
                                type="password"
                                name="password"
                                // value={user.password}
                                value={user.password || ''}
                                onChange={handleChange}
                                // error={!!errors.password}
                                // helperText={errors.password}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Image"
                                type="url"
                                name="image"
                                // value={user.image.url}
                                value={user.image ? user.image.url || '' : ''}
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Image Alt"
                                type="text"
                                name="imageAlt"
                                // value={user.image.alt}
                                value={user.image ? user.image.alt || '' : ''}
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="State"
                                type="text"
                                name="state"
                                // value={user.address.state}
                                value={user.address ? user.address.state || '' : ''}
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Country *"
                                type="text"
                                name="country"
                                // value={user.address.country}
                                value={user.address ? user.address.country || '' : ''}
                                onChange={handleChange}
                                // error={!!errors.country}
                                // helperText={errors.country}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="City *"
                                type="text"
                                name="city"
                                // value={user.address.city}
                                value={user.address ? user.address.city || '' : ''}
                                onChange={handleChange}
                                // error={!!errors.city}
                                // helperText={errors.city}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Street *"
                                type="text"
                                name="street"
                                // value={user.address.street}
                                value={user.address ? user.address.street || '' : ''}
                                onChange={handleChange}
                                // error={!!errors.street}
                                // helperText={errors.street}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="House Number *"
                                type="number"
                                name="houseNumber"
                                // value={user.address.houseNumber}
                                value={user.address ? user.address.houseNumber || '' : ''}
                                onChange={handleChange}
                                // error={!!errors.houseNumber}
                                // helperText={errors.houseNumber}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Zip Code *"
                                type="number"
                                name="zip"
                                // value={user.address.zip}
                                value={user.address ? user.address.zip || '' : ''}
                                onChange={handleChange}
                                // error={!!errors.zip}
                                // helperText={errors.zip}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={user.isBusiness} onChange={(e) => setUser(prevState => ({ ...prevState, isBusiness: e.target.checked }))} />}
                                label="Signup as Business"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="reset" variant="outlined" color="secondary" fullWidth>Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Save Changes</Button>
                        </Grid>
                    </Grid>
                </form>
                )}
            </div>
        </div>
    );
};

export default EditUser;
