import { placeholder } from "../../../data/filesData";

export const handleOpenFile = (id, windowTitle, windowIcon, src, filesData, windowList,  handleOpenWindow, handleNewFile) => {
  if (windowTitle === 'Novo' || windowTitle === 'New') {
    handleNewFile(placeholder);
  } else {
    try {
      if (!windowList.find((win) => win.id === id)) {
        handleOpenWindow(id, windowTitle, windowIcon, src, filesData);
      }
    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;