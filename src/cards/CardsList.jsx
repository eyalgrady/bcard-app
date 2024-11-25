import { useState, useEffect, useContext } from 'react';
import { getCards } from '../hooks/UseAPI';
import APIContext from '../components/contexts/APIContext';
import CardFormat from './CardFormat'
import { SearchContext, GeneralContext } from '../App';

const CardsList = () => {
  const [cards, setCards] = useState([])
  const apiURL = useContext(APIContext);
  const { searchResults } = useContext(SearchContext);
  const [displayedCards, setDisplayedCards] = useState([]);
  const { setLoader } = useContext(GeneralContext);

  useEffect(() => {
    setLoader(true);
    getCards(apiURL).then(json => {
      setCards(json);
      setLoader(false);
    });
  }, [apiURL, setLoader]);

    useEffect(() => {
    if (searchResults.length > 0) {
      setDisplayedCards(searchResults);
    } else {
      setDisplayedCards(cards);
    }
  }, [searchResults, cards])

  return (
    <main className='cards-container'>
      <h1>Cards Page</h1>
      <h2>Here you can find business cards from all categories</h2>
      <div className="cards_list">
        {displayedCards.length > 0 ? (
          displayedCards.map(card => <CardFormat key={card._id} card={card} />)
        ) : (
          <article><p>Loading...</p></article>
        )}
      </div>
    </main>
  )
}

export default CardsList