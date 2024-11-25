import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { GeneralContext } from '../App';
import CardFormat from './CardFormat';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Mycards = () => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState();
    const token = localStorage.getItem('x-auth-token');
    const { setLoader } = useContext(GeneralContext);
    
    useEffect(()=> {
        const fetchCards = async() => {
            try {
                axios.defaults.headers.common['x-auth-token'] = token;
                setLoader(true);
                const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards');
                setCards(response.data);
            } catch(error) {
                // setError(error.message);
                setError(error.response.data);
                console.log(error);
            } finally {
                setLoader(false);
            }
        } 
        fetchCards();
    }, [setLoader, token])
    
    if (error) return <div>Error {error}</div>;
    if (!cards) return <div>No cards</div>;

    return (
        <main>
            <h1>My Cards</h1>
            <h2>Here you can find business all your business cards</h2>
            <Button component={Link} to="/create" className='button-create' sx={{color: 'white',  backgroundColor: '#1976d2',}}>ADD CARD</Button>
            
            <div className='cards_list'>
                { cards.map(card => (
                    <CardFormat card={card} key={card._id} showActions={true} />
                ))}
            </div>
        </main>
    )
}

export default Mycards;