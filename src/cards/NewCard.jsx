import React from 'react';
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import useCardForm from '../hooks/useCardForm'

const NewCard = () => {
    const [ card, handleChange, handleSubmitCreate, errors, handleReset, handleCloseSnackbar, snackbarOpen, snackbarMessage ] = useCardForm();
    
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-5'>
                <h3 className='text-center mb-4'>CREATE CARD</h3>
                
                <form onSubmit={handleSubmitCreate} 
                onReset={handleReset}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined" 
                            label="Title *"
                            name='title'
                            value={card.title} 
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="Subtitle *" 
                            name='subtitle'
                            value={card.subtitle} 
                            onChange={handleChange}
                            error={!!errors.subtitle}
                            helperText={errors.subtitle}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="Description *" 
                            name= "description"
                            value={card.description} 
                            onChange={handleChange} 
                            error={!!errors.description}
                            helperText={errors.description}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined" 
                            label="Phone *" 
                            type="tel"
                            name='phone'
                            value={card.phone} 
                            onChange={handleChange} 
                            error={!!errors.phone}
                            helperText={errors.phone}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="Email *" 
                            type="email"
                            name='email'
                            value={card.email} 
                            onChange={handleChange} 
                            error={!!errors.email}
                            helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined" 
                            label="Web" 
                            name='web'
                            value={card.web} 
                            error={!!errors.web}
                            helperText={errors.web}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined" 
                            label="Image URL" 
                            name='url'
                            value={card.image.url} 
                            error={!!errors.url}
                            helperText={errors.url}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="Image Alt" 
                            name='alt'
                            value={card.image.alt} 
                            error={!!errors.alt}
                            helperText={errors.alt}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>State</InputLabel>
                                <Select 
                                value={card.address.state} 
                                onChange={handleChange} 
                                label="State">
                                    <MenuItem value="State1">State1</MenuItem>
                                    <MenuItem value="State2">State2</MenuItem>
                                    <MenuItem value="State3">State3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="Country *" 
                            name='country'
                            value={card.address.country} 
                            onChange={handleChange} 
                            error={!!errors.country}
                            helperText={errors.country}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="City *" 
                            name='city'
                            value={card.address.city} 
                            onChange={handleChange} 
                            error={!!errors.city}
                            helperText={errors.city}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="Street *" 
                            name='street'
                            value={card.address.street} 
                            onChange={handleChange} 
                            error={!!errors.street}
                            helperText={errors.street}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="House Number *" 
                            type="number" 
                            name='houseNumber'
                            value={card.address.houseNumber} 
                            onChange={handleChange} 
                            error={!!errors.houseNumber}
                            helperText={errors.houseNumber}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                            fullWidth
                            className='input'
                            variant="outlined"
                            label="ZIP" 
                            name='zip'
                            value={card.address.zip} 
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                            fullWidth
                            variant="outlined"
                            type="reset" 
                            color="secondary" 
                            >Cancel</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button 
                            fullWidth
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            >Create Card</Button>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleCloseSnackbar}
                        severity="success">
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>

            </div>
        </div>
    );
};

export default NewCard;