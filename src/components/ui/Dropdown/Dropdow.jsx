import React from 'react';
import StyledDropdown from './StyledDropdown';

const Dropdown = ({
  dropdownList = [],
  dropdownIndex = '0',
  dropdownTitle = 'placeholder',
  windowKey = 'dropdown',
}) => {
  return (
    <>
      <a>{dropdownTitle}</a>
      <StyledDropdown
        name={dropdownTitle}
        id={dropdownTitle}
        key={`${windowKey}-${dropdownIndex}`}
      >
        {dropdownList.map((item, index) => (
          <React.Fragment key={`${windowKey}-${dropdownIndex}-${index}`}>
            {item.isDivisor ? <hr /> : <li>{item.label}</li>}
          </React.Fragment>
        ))}
      </StyledDropdown>
    </>
  );
};

export default Dropdown;
