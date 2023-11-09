import React, { useEffect, useRef, useState } from 'react'
import './autocomplete.css'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

function Autocomplete({ selected, setSelected, items, placeholder }) {
    const [isActive, setIsActive] = useState(false)
    const dropdownRef = useRef(null);

    const handleDocumentClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
        document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
  return (
    <div className='dropdown' ref={dropdownRef}>
        <div className="dropdown-btn"
            onClick={(e) => {
                setIsActive(!isActive)
            }}
        >
            {selected ? selected : placeholder}
              {isActive ?
                  <MdKeyboardArrowUp size={20} /> :
                  <MdKeyboardArrowDown size={20}
                />}
        </div>
        {isActive && (
        <div className="dropdown-content">
            {items.map(item => (
                <div
                    key={item}
                    onClick={(e) => {
                        setSelected(item);
                        setIsActive(false);
                    }}
                    className="dropdown-item"
                    style={{
                        color: item === selected ? 'blue':'',
                    }}
                >
                    {item}   
                </div>
            ))}
        </div>
        )}
    </div>
  )
}

export default Autocomplete
