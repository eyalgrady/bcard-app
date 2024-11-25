import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {Card,CardHeader,CardMedia,CardContent,CardActions,Avatar,IconButton,Typography} from '@mui/material';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import LikeButton from '../components/LikeButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { deleteCard } from '../hooks/UseAPI';
import { GeneralContext } from '../App';
import APIContext from '../components/contexts/APIContext';

const CardFormat = ({card, showActions}) => {
    const apiURL = useContext(APIContext);
    const token = localStorage.getItem('x-auth-token');
    const navigate = useNavigate();
    const { setLoader } = useContext(GeneralContext);

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
    
    return (
        <Card className="card splash-darker" sx={{ maxWidth: 350, flex: '1 1 calc(33.33% - 1%)', boxSizing: 'border-box', marginTop: '1%' }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {card.title[0]}
                    </Avatar>}
                title={card.title}
                subheader={card.createdAt}/>

            <Link to={`/cards/${card._id}`}>
                <CardMedia
                    component="img"
                    height="194"
                    image={card.image.url}
                    title={card.title}
                    alt={card.image.alt}/>
            </Link>

            <CardContent className="card-content">
                <Typography variant="h6" gutterBottom>
                    {card.subtitle}
                </Typography>
                <div className="flexContainerStyle">
                    <div><span className="boldTextStyle">Phone:</span> {card.phone}</div>
                    <div><span className="boldTextStyle">Address:</span> {card.address.street} {card.address.houseNumber}, {card.address.city}, {card.address.country}.</div>
                    <div><span className="boldTextStyle">Card Number:</span> {card.bizNumber}</div>
                </div>
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
    )
}

export default CardFormat;