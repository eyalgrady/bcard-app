import { useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import axios from 'axios';
import SearchResultsList from './SearchResultsList';

const SearchBar = ({ handleSearchResults  }) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const fetchData = (value) => {
    axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards')
        .then(response => {
            const results = response.data.filter(card => {
                return (
                    value &&
                    card &&
                    card.title &&
                    card.title.toLowerCase().includes(value.toLowerCase())
                );
            });
            setResults(results);
            handleSearchResults(results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <form className='input-wrapper'>
            <FaSearch id='searchIcon'/>
            <input
            style={{ color: 'black'}}
            type='search'
            placeholder='Search'
            value={input}
            onChange={(e)=> handleChange(e.target.value)}/>
            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: '100' }}>
                <SearchResultsList results={results} />
            </div>
        </form>
    )
}

export default SearchBar