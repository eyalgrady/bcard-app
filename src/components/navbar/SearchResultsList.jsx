import React from 'react'
import SearchResult from './SearchResult'

const SearchResultsList = ({results}) => {

    return (
        <div className='results-list'>
            {results.length > 0 && (
                results.map((result) => (
                    <SearchResult key={result._id} result={result} />
                ))
            )}
        </div>
    )
}

export default SearchResultsList