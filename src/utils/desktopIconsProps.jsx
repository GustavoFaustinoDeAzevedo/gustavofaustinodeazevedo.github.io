// // import { addIcon, focusWindow, openWindow } from '../actions/windowActions';
// import { useRef } from 'react';
// import { placeholder } from '../data/desktopIconsData';
// // import { useSelector } from 'react-redux';
// // import useWindowActions from '../hooks/useWindowActions';

// // Generate props for a DesktopIcon component
// export const getDesktopIconProps = (
//   windowList,
//   language,
//   handleOpenWindow,
//   handleAddIcon,
//   id,
//   finalTitle,
//   icon,
//   windowParams = {}
// ) => {
//   return {
//     id: id,
//     title: finalTitle,
//     icon: icon,
//     language: language,
//     onClick: () => {
//       if (finalTitle === 'Novo' || finalTitle === 'New') {
//         handleAddIcon(placeholder);
//       } else {
//         try {
//           if (!windowList.find((win) => win.id === id)) {
//             handleOpenWindow(id, finalTitle, icon, windowParams);
//           }
//         } catch (error) {
//           console.error('Error opening window:', error);
//         }
//       }
//     },
//   };
// };
