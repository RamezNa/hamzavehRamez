import './dropDownMenue.css'

import React, { useEffect, useState } from 'react';

export const Dropdown = ({events , setSelectedOption  ,selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  

  const handleOptionSelect = (date , id , index) => {
    
    setSelectedOption({'date':date , 'id':id , 'index':index});
    setIsOpen(false);
  };


  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption['date']}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {events.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option['date'] , option['id'] , index)}>
              {option['date']}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


