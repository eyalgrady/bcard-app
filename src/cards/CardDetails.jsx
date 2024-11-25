import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';
import {Card,CardMedia,CardContent,CardActions,IconButton,Typography,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GeneralContext } from '../App';
import { getCardById, deleteCard } from '../hooks/UseAPI';
import APIContext from '../components/contexts/APIContext';
import LikeButton from '../components/LikeButton';

const CardDetails = ({showActions}) => {
    const navigate = useNavigate();
    const { card_id } = useParams();
    const [card, setCard] = useState(null);
    const { setLoader } = useContext(GeneralContext);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('x-auth-token');
    const apiURL = useContext(APIContext);
    
    useEffect(() => {
        const fetchCard = async () => {
            try {
                setLoader(true);
                const cardData = await getCardById(apiURL, card_id);
                setCard(cardData);
            } catch (error) {
                console.error('Error fetching card', error);
                console.error('Error registering', error);
                console.error('Response data:', error.response.data);
                alert(`Error registering: ${error.response.data}`);
                setError(error.response.data.message);
                setError(error.response?.data?.message || 'Failed to fetch card details');
            } finally {
                setLoader(false);
            }
        };

        fetchCard();
    }, [card_id, apiURL, setLoader]);

    const handleDelete = async (card_id) => {
        try {
            setLoader(true);
            await deleteCard(apiURL, card_id)
            navigate('/cards/my-cards');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting card:', error.message);
            alert(`Error deleting card: ${error.response.data.message || 'Unknown error'}`);
            setLoader(false);
        }
    }

    if (error) return <div>Error: {error}</div>

    return (
        
        <div className='card-container'>
            {/* {card_id} */}
            {card && (
            <Card className="card splash-darker">
                {/* <CardHeader
                    avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{card.title[0]}</Avatar>}
                    title={card.title}/> */}
                    
                <CardMedia
                    component="img"
                    height="194"
                    image={card.image.url}
                    alt="Paella dish"/>

                <CardContent className="card-content">
                    <Typography variant="h3">{card.title}</Typography>
                    <Typography variant="h5" gutterBottom>{card.subtitle}</Typography>
                    <Typography variant="P" gutterBottom>{card.description}</Typography>
                    <Typography variant="body" className="flexContainerStyle">
                        <Typography variant="div">
                            <span className="boldTextStyle">Phone:</span> {card.phone}
                        </Typography>
                        <Typography variant="div">
                            <span className="boldTextStyle">Email:</span> <a href={`mailto:${card.email}`}>{card.email}</a>
                        </Typography>
                        <Typography variant="div">
                            <span className="boldTextStyle">WEB:</span> 
                            <a href={card.web} target="_blank" rel="noopener noreferrer">
                                {card.web}
                            </a>
                        </Typography>
                        <Typography variant="div">
                            <span className="boldTextStyle">Address:</span> {card.address.street} {card.address.houseNumber}, {card.address.city}, {card.address.country}.
                        </Typography>
                        <Typography variant="div">
                            <span className="boldTextStyle">Card Number:</span> {card.bizNumber}
                        </Typography>
                    </Typography>
                    
                </CardContent>

                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                    <IconButton className='card-actions' aria-label="share" disableRipple >
                        <ShareIcon />
                    </IconButton>
                    {token && (
                        <LikeButton card={card}/>
                        )}
                    </div>
                    {showActions && (
                    <div>
                        <IconButton
                        className='card-actions'
                        aria-label="edit"
                        onClick={(e)=>{
                            e.stopPropagation();
                            navigate(`/cards/${card._id}/edit`)}}
                        disableRipple>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                        className='card-actions'
                        aria-label="delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(card._id);}}
                        disableRipple>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    )}
                </CardActions>
            </Card>
            )}
        </div>
    )
}

export default CardDetails