import React, { useState, useEffect, useRef } from 'react';
import './dropdown.css';
import { MdCheck, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

function Testdropdown(props) {
  const { placeholder, data, error='' } = props;

  const [results, setResults] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const autocompleteRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

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
    if (term) {
      const filteredResults = data.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults.slice(0, 4));
      setIsOpen(filteredResults.length > 0);

      if (selectedId !== null) {
        const selectedResult = filteredResults.find((result) => result.id === selectedId);
        if (!selectedResult) {
          setSelectedId(null);
        }
      }
    } else {
      // Si l'input est vide et en focus, afficher toutes les valeurs de data
      if (document.activeElement === document.getElementById('autocomplete-input')) {
        setResults(data);
      } else {
        setResults([]);
      }
      setSelectedId(null);
      setIsOpen(false);
    }
  };

  const handleItemClick = (item) => {
    setSearchValue(item.title);
    setSelectedId(item.id);
    setIsOpen(false);
    // Appeler onSelectId avec l'ID sélectionné
    props.onSelectId(item.id);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue, data]);

  const handleSearchValueChange = (value) => {
    setSearchValue(value);
    const matchingOption = data.find((item) => item.title.toLowerCase() === value.toLowerCase());
    setSelectedId(matchingOption ? matchingOption.id : null);
    if (!matchingOption) {
      props.onResetId(); // Appeler la fonction pour réinitialiser l'ID dans EmpruntBook
    }
  };

  return (
    <div style={{backgound:'red', position:'relative' }}>
      <div ref={autocompleteRef} className="autocomplete" style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            background: 'white',
            borderRadius: 5,
            alignItems: 'center',
            paddingRight: 5,
            border: error ? '1px solid red' : '',     
          }}
        >
          <input
            type="text"
            placeholder={placeholder ? placeholder : 'Search...'}
            value={searchValue}
            onChange={(e) => handleSearchValueChange(e.target.value)}
            onFocus={() => {
              if (!searchValue) {
                // Si l'input est en focus et vide, afficher toutes les valeurs de data
                setResults(data);
              }
              setIsOpen(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsOpen(false);
              }, 200);
            }}
            id="autocomplete-input"
          />
          {isOpen ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
        </div>
        {isOpen && results.length > 0 && (
          <ul className="results">
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(result)}
                style={{
                  color: result.id === selectedId ? 'blue' : '',
                  display: 'flex',
                  justifyContent: result.id === selectedId ? 'space-between' : '',
                }}
              >
                {result.title}
                {result.id === selectedId && <MdCheck />}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span style={{
        position:'absolute',
        top:'110%',
        left: 5,
        color:'red',
      }}>{error}</span>
    </div>
    
  );
}

export default Testdropdown;
