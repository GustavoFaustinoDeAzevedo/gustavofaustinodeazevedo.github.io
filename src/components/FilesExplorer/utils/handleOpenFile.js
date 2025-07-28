import { placeholder } from "../../../data/filesData";

export const handleOpenFile = ({ fileId, currentNode, windowTitle, language, windowIcon, src, isUnique, openMode, windowList, children, handleNewFile, windowActions, fileType, nodeType, handleWindowUpdate, nodeDepth }) => {
  if (windowTitle[language] === 'Adicionar Arquivo' || windowTitle[language] === 'New File') {
    console.log('Creating new file with ID:', currentNode);
    handleNewFile(placeholder, currentNode, nodeDepth);
    console.log(handleWindowUpdate);
    nodeType === 'folder' ? handleWindowUpdate({ children: placeholder }) : null;
    console.log(nodeType);
  } else {
    try {
      if (fileId === undefined || fileId === null) {
        throw new Error(`Invalid file ID: ${fileId}`);
      }

      if (openMode === 'window' || fileType === 'app') {
        //file will open on a new window
        windowActions.handleOpenWindow(JSON.stringify({ windowId: fileId, title: windowTitle, icon: windowIcon, src, children, isUnique, type: fileType, nodeDepth }));
      } else if (openMode === 'tab') {
        //file will open on a new tab
      } else {
        windowActions.handleUpdateWindow({ currentNode: fileId, title: windowTitle, icon: windowIcon, src, children, isUnique, type: fileType, nodeDepth })
      }

    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;