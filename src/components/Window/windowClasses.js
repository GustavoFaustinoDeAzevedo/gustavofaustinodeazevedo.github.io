
const getWindowClass = ({ isFocused, isMinimized, isOpen, isMaximized }) => {
  return `window ${isFocused ? 'focus' : ''} ${isMinimized ? 'minimized' : ''} ${isOpen ? 'open' : ''} ${isMaximized ? 'maximized' : ''}`;
};

export default getWindowClass;
