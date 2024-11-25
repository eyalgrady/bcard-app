import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GeneralContext } from '../App';
import {jwtDecode} from 'jwt-decode';
import CardFormat from './CardFormat';

const Favourites = () => {
    const token = localStorage.getItem('x-auth-token');
    const [favoriteCards, setFavoriteCards] = useState([]);
    const { setLoader } = useContext(GeneralContext);

    useEffect(() => {
    const fetchFavoriteCards = async () => {
    const decodedToken = jwtDecode(token);
        try {
            setLoader(true);
            axios.defaults.headers.common['x-auth-token'] = token;
            const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`);

            const filteredFavoriteCards = response.data.filter(card => card.likes.includes(decodedToken._id));

            // הוספת תכונה liked לכל כרטיס ברשימת המועדפים
            const cardsWithLikedStatus = filteredFavoriteCards.map(card => ({
                ...card,
                liked: true // או שתשתמש ב-true/false בהתאם למצב
            }));

            setFavoriteCards(cardsWithLikedStatus);
        } catch (error) {
            console.error('Error fetching favorite cards:', error);
            console.error('Response data:', error.response.data);
            alert(`Error creating product: ${error.response.data}`);
        }
        setLoader(false);
    };

    fetchFavoriteCards();
}, [setLoader, token]);

    return (
        <main>
            <h1>My Favorites</h1>
            <h2>Here you can find business cards you liked</h2>
            <div className='cards_list'>
                {favoriteCards.map(favorite => (
                    <CardFormat card={favorite} key={favorite._id} />
                ))}
                
            </div>
        </main>
    );
}

export default Favourites;