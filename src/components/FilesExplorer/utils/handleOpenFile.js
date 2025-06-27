import { placeholder } from "../../../data/filesData";

export const handleOpenFile = ({ id, nodeId, windowTitle, windowIcon, src, isUnique, windowList, children, handleNewFile, windowActions, fileType, nodeType, handleUpdate }) => {
  if (windowTitle === 'Novo' || windowTitle === 'New') {
    const newChildren = { ...children, placeholder }
    nodeType === 'folder' ? handleUpdate(newChildren) : null;
    handleNewFile(placeholder, nodeId);

  } else {
    try {
      const window = windowList.find((win) => win.id === id)
      if (!window) {
        windowActions.handleOpenWindow(id, windowTitle, windowIcon, src, children, isUnique, fileType);
      }
    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;