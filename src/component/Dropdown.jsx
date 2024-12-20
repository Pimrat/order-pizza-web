import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ position, customStyles, name, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {name}
      </div>
      {isOpen && (
        <div className={`absolute bg-white shadow-lg rounded-lg ${position} ${customStyles}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
