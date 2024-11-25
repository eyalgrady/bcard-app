import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({ card }) => {
    const token = localStorage.getItem('x-auth-token');
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const decodedToken = jwtDecode(token);
        if (card.likes.includes(decodedToken._id)) {
            setLiked(true);
        }
    }, [card.likes, token]);

    const toggleLike = async () => {
        axios.defaults.headers.common['x-auth-token'] = token;
        const decodedToken = jwtDecode(token);
        const updatedLikes = liked ? card.likes.filter(id => id !== decodedToken._id) : [...card.likes, decodedToken._id];
        try {
            await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`, { likes: updatedLikes });
            setLiked(!liked);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <>
            {liked ? (
                <IconButton aria-label="unlike" className='card-actions' onClick={toggleLike} color="error" disableRipple>
                    <FavoriteIcon />
                </IconButton>
            ) : (
                <IconButton aria-label="like" className='card-actions' onClick={toggleLike} disableRipple>
                    <FavoriteBorderIcon />
                </IconButton>
            )}
        </>
    );
};

export default LikeButton;