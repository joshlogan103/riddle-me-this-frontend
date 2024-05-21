import React, { useState } from 'react';
import './browseHunts.css';

const BrowseHunts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Dummy data for illustration
    const dummyResults = [
      'Hunt 1: Find the hidden treasure in the park.',
      'Hunt 2: Solve the mystery at the old library.',
      'Hunt 3: Discover secrets in the downtown area.',
    ];

    setResults(dummyResults.filter(hunt => hunt.toLowerCase().includes(searchQuery.toLowerCase())));
  };

  return (
    <div className="browse-hunts">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for hunts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result-item">
              {result}
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default BrowseHunts;
