
const getWindowClass = ({ isFocused, isMinimized, isOpen, isMaximized }) => {
  // console.log(isOpen);
  return `window ${isFocused ? 'focus' : ''}  ${isMaximized ? 'maximized' : ''}`;
};
// ${isMinimized ? 'minimized' : ''}  ${isOpen ? 'open' : ''}
export default getWindowClass;
