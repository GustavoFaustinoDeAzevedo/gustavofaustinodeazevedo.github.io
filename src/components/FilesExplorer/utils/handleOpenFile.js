import { placeholder } from "../../../data/filesData";

export const handleOpenFile = ({ id, nodeId, windowTitle, language, windowIcon, src, isUnique, windowList, children, handleNewFile, windowActions, fileType, nodeType, handleWindowUpdate, index }) => {
  if (windowTitle[language] === 'Novo' || windowTitle[language] === 'New') {
    console.log('Creating new file with ID:', nodeId);
    handleNewFile(placeholder, nodeId, index);
    console.log(handleWindowUpdate);
    nodeType === 'folder' ? handleWindowUpdate({ children: placeholder }) : null;
    console.log(nodeType);
  } else {
    try {
      if (id === undefined || id === null) {
        throw new Error(`Invalid file ID: ${id}`);
      }
      // const existingWindow = windowList.find((win) => win.nodeId === id && fileType === 'folder');
      // if (!existingWindow) {
      windowActions.handleOpenWindow(JSON.stringify({ id, title: windowTitle, icon: windowIcon, src, children, isUnique, type: fileType, index }));
      // } else {
      //   handleWindowUpdate({ id, requestingRestore: true });
      // }
    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;