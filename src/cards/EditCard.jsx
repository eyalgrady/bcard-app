import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GeneralContext } from '../App';
import { TextField, Button, Grid, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { getCardById, updateCard } from '../hooks/UseAPI';
import APIContext from '../components/contexts/APIContext';

const EditCard = () => {
    const navigate = useNavigate();
    const { card_id } = useParams();
    const apiURL = useContext(APIContext);
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const { setLoader } = useContext(GeneralContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchCard = async () => {
            try {
                setLoader(true);
                const cardData = await getCardById(apiURL, card_id);
                setCard(cardData);
            } catch (error) {
                console.error('Error fetching card', error);
                setError(error.response?.data?.message || 'Failed to fetch card details');
            } finally {
                setLoader(false);
            }
        };

        fetchCard();
    }, [card_id, apiURL, setLoader]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            await updateCard(apiURL, card_id, card);
            setLoader(false);
            setSnackbarMessage('Card updated successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating card', error);
            setError(error.response?.data?.message || 'Failed to update card');
            setLoader(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        navigate('/cards/my-cards')
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-5'>
            
            {card && (
                <div key={card._id}>
                    <h3 className='text-center mb-4'>Edit {card.title}</h3>
                    <form onSubmit={handleSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Title *"
                                name="title"
                                value={card.title}
                                onChange={handleChange}
                                // error={!!errors.title}
                                // helperText={errors.title}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Subtitle *"
                                name="subtitle"
                                value={card.subtitle}
                                onChange={handleChange}
                                // error={!!errors.subtitle}
                                // helperText={errors.subtitle}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Description *"
                                name="description"
                                value={card.description}
                                onChange={handleChange}
                                // multiline
                                // error={!!errors.description}
                                // helperText={errors.description}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Phone *"
                                name="phone"
                                value={card.phone}
                                onChange={handleChange}
                                // error={!!errors.phone}
                                // helperText={errors.phone}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Email *"
                                name="email"
                                value={card.email}
                                onChange={handleChange}
                                // error={!!errors.email}
                                // helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Web"
                                name="web"
                                value={card.web}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Image URL"
                                name="url"
                                value={card.image.url}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Image Alt"
                                name="alt"
                                value={card.image.alt}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="State"
                                name="state"
                                value={card.state}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Country *"
                                name="country"
                                value={card.address.country}
                                onChange={handleChange}
                                // error={!!errors.country}
                                // helperText={errors.country}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="City"
                                name="city"
                                value={card.address.city}
                                onChange={handleChange}
                                // error={!!errors.city}
                                // helperText={errors.city}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="Street"
                                name="street"
                                value={card.address.street}
                                onChange={handleChange}
                                // error={!!errors.street}
                                // helperText={errors.street}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="House Number"
                                name="houseNumber"
                                value={card.address.houseNumber}
                                onChange={handleChange}
                                // error={!!errors.houseNumber}
                                // helperText={errors.houseNumber}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                fullWidth
                                variant="outlined"
                                label="ZIP"
                                name="zip"
                                value={card.address.zip}
                                onChange={handleChange}
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
            )}
            </div>
        </div>
    );
};

export default EditCard;