import { useEffect, useState, Suspense } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';

import { createResource } from './helper';

export default function App() {
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('Search for Music!');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (search) {
      setMessage('Loading...');
      try {
        const resource = createResource(search);
        setData(resource);
        setMessage('');
      } catch (error) {
        setMessage('Failed to fetch data');
        console.error("Fetch error: ", error);
      }
    }
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term);
  };

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<h1>Loading...</h1>} >
          <Gallery data={data} />
        </Suspense >
      )
    }
  }


  return (
    <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}
