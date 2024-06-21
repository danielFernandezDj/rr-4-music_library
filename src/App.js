import { useEffect, useState, Suspense } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import { createResource } from './helper'; // Import the createResource function

export default function App() {
  const [search, setSearch] = useState(''); // State to store the search term
  const [message, setMessage] = useState('Search for Music!'); // State to store the message
  const [data, setData] = useState(null); // State to store the fetched data resource

  // useEffect to fetch data when search term changes
  useEffect(() => {
    if (search) {
      setMessage('Loading...'); // Set loading message
      try {
        const resource = createResource(search); // Fetch data and create a resource
        setData(resource); // Set the fetched resource to state
        setMessage(''); // Clear the message
      } catch (error) {
        setMessage('Failed to fetch data'); // Set error message
        console.error("Fetch error: ", error); // Log the error
      }
    }
  }, [search]); // Dependency array contains search term

  // Function to handle the search form submission
  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term); // Update the search term state
  };

  // Function to render the Gallery component with the fetched data
  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Gallery data={data} /> {/* Passing data as a prop to Gallery */}
        </Suspense>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <SearchBar handleSearch={handleSearch} /> {/* Passing handleSearch function to SearchBar */}
      {message} {/* Display the message */}
      {renderGallery()} {/* Render the Gallery component if data is available */}
    </div>
  );
}
