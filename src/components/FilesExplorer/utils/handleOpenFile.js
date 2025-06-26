import { placeholder } from "../../../data/filesData";

export const handleOpenFile = (id, nodeId, windowTitle, windowIcon, src, children, windowList, handleOpenWindow, handleNewFile, isUnique) => {
  if (windowTitle === 'Novo' || windowTitle === 'New') {
    handleNewFile(placeholder, nodeId);
  } else {
    try {
      const window = windowList.find((win) => win.id === id)
      if (!window) {
        handleOpenWindow(id, windowTitle, windowIcon, src, children, isUnique);
      }
    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;