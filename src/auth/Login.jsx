import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import useUserForm from '../hooks/useUserForm';

const Login = () => {
    const [ user, , handleChange, , handleSubmitLogin, errors, , , ,  ] = useUserForm('login');

    return (
        <div className='d-flex justify-content-center align-items-center' >
            <div className='form_container p-5'>
                <h3 className='text-center mb-3'>LOGIN</h3>
                <form onSubmit={handleSubmitLogin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email *"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password *"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}/>
                        </Grid>

                        {errors.global && (
                            <Grid item xs={12}>
                                <div className="error-message" style={{ color: 'red' }}>
                                    {errors.global}
                                </div>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Log in
                            </Button>
                        </Grid>

                        
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default Login;