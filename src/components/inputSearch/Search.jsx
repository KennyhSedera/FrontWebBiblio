import React, { useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import './search.css'

function Search({ ...props }) {
  const inputRef = useRef();

  const handleLabelClick = () => {
    inputRef.current.focus();
  }

  const handleBlur = () => {
    const inputValue = inputRef.current.value;

    // Vérifier si l'input n'est pas vide
    if (inputValue.trim() === '') {
      const check = document.getElementById('check');
      check.checked = false;
    }
  }

  return (
    <div>
      <input type="checkbox" id="check" />
      <div className="search-box">
        <input
          type="text"
          placeholder='Chercher quelque chose ...'
          onBlur={handleBlur}
          ref={inputRef}
          {...props}
        />
        <label htmlFor="check" className='icon' onClick={handleLabelClick}>
          <FaSearch />
        </label>
      </div>
    </div>
  )
}

export default Search
