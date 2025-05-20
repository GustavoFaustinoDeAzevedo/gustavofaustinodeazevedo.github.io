
const getWindowClass = ({ isFocused, isMinimized, isOpen, isMaximized }) => {
  // console.log(isOpen);
  return `window ${isFocused ? 'focus' : ''}   `;
};
// ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isOpen ? 'open' : ''} ${isOpen ? 'open' : ''}
export default getWindowClass;
