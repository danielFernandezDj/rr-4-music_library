import { useState, useRef } from 'react'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'

function App() {
  const [message, setMessage] = useState('Search for Music!')
  const [data, setData] = useState([])
  const searchInput = useRef('')

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      try {
        document.title = `${term} Music`
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resData = await response.json()
        if (resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        setMessage('Failed to fetch data')
      }
    }
    if (term) {
      fetchData()
    }
  }

  return (
    <div style={{ 'display': 'flex', 'flexFlow': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar />
      </SearchContext.Provider>

      {message}

      <DataContext.Provider value={data} >
        <Gallery />
      </DataContext.Provider>
    </div>
  )
}

export default App;
