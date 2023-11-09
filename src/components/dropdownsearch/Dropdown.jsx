import React, { useState, useEffect, useRef } from 'react';
import './dropdown.css';
import { MdCheck } from 'react-icons/md';

function Dropdown(props) {
  const { data, searchValue, onSearchValueChange } = props;
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleSearch = (term) => {
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filteredResults.slice(0, 4));
    setIsOpen(filteredResults.length > 0);
  };

  const handleItemClick = (item) => {
    onSearchValueChange(item);
    setIsOpen(false);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue, data]);

  return (
    <div ref={autocompleteRef} className="autocomplete">
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
        onBlur={()=>setIsOpen(true)}
      />
      {isOpen && results.length > 0 && (
        <ul className="results">
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(result)}
              style={{
                color: result === searchValue ? 'blue' : '',
                display: 'flex',
                justifyContent: result === searchValue ? 'space-between' : '',
              }}
            >
              {result}
              {
                result === searchValue && <MdCheck />
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
