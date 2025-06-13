import { placeholder } from "../../../data/filesData";

export const handleOpenFile = (id, windowTitle, windowIcon, src, filesData, windowList,  handleOpenWindow, handleNewFile, isUnique) => {
  if (windowTitle === 'Novo' || windowTitle === 'New') {
    handleNewFile(placeholder);
  } else {
    try {
      const window = windowList.find((win) => win.id === id )
      if (!window) {
        handleOpenWindow(id, windowTitle, windowIcon, src, filesData, isUnique);
      }
    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;