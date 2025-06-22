import StyledDropdown from './StyledDropdown';

const Dropdown = ({ dropdownList}) => {
  return (
    <StyledDropdown name={dropdownList.name} id={dropdownList.name} key={dropdownList.key}>
      {dropdownList.map((item, index) => (
        <React.Fragment key={index}>
          {item.isDivisor ? <hr /> : <li>{item.label}</li>}
        </React.Fragment>
      ))}
    </StyledDropdown>
  );
};

export default Dropdown;
