import { placeholder } from "../../../data/filesData";

export const handleOpenFile = ({ id, nodeId, windowTitle, windowIcon, src, isUnique, windowList, children, handleNewFile, windowActions, fileType, nodeType, handleUpdate }) => {
  if (windowTitle === 'Novo' || windowTitle === 'New') {
    nodeType === 'folder' ? handleUpdate(placeholder) : null;
    handleNewFile(placeholder, nodeId);

  } else {
    try {
      if (id === undefined || id === null) {
        throw new Error(`Invalid file ID: ${id}`);
      }
      const existingWindow = windowList.find((win) => win.id === id);
      if (!existingWindow) {
        windowActions.handleOpenWindow(JSON.stringify({ id, title: windowTitle, icon: windowIcon, src, children, isUnique, type: fileType }));
      }
    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;