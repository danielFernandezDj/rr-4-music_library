// import { useState } from 'react'

import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';


function SearchBar() {
  // const [searchTerm, setSearchTerm] = useState('') // Hold code!
  const {term, handleSearch} = useContext(SearchContext)

  return (
    <div>
      <form>
        <input ref={term} type='text' placeholder='Search Here' />
        <button onClick={(e) => handleSearch(e, term.current.value)}>Submit</button>
      </form>
    </div>
  )
}

export default SearchBar;