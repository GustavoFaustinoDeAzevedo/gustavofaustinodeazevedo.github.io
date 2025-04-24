
const getWindowClass = ({ isFocused, isMinimized, isOpen, isMaximized }) => {
  // console.log(isOpen);
  return `window ${isFocused ? 'focus' : ''} ${isMinimized ? 'minimized' : ''} ${isOpen ? 'open' : ''} ${isMaximized ? 'maximized' : ''}`;
};

export default getWindowClass;
