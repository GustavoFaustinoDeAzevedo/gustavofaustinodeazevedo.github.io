import actions from "@/store/actions";
import { placeholder } from "@/data/filesData";

export const handleOpenFile = ({ fileId, initialDimensions, currentNode, windowTitle, language, windowIcon, src, isUnique, initialStates, openMode, children, handleNewFile, windowActions, fileType, nodeType, handleWindowUpdate, nodeDepth }) => {

  if (windowTitle[language] === 'Adicionar Arquivo' || windowTitle[language] === 'New File') {
    handleNewFile(placeholder, currentNode, nodeDepth);
    nodeType === 'folder' ? handleWindowUpdate({ children: placeholder }) : null;

  } else {
    try {
      if (fileId === undefined || fileId === null) {
        throw new Error(`Invalid file ID: ${fileId}`);
      }

      if (openMode === 'window' || fileType === 'app') {
        //Abrir uma nova janela
        windowActions.handleOpenWindow(JSON.stringify({ windowId: fileId, title: windowTitle, icon: windowIcon, src, children, isUnique, isRequestingMaximize: initialStates.maximized, type: fileType, initialDimensions, nodeDepth }));
      } else if (openMode === 'tab') {
        //file will open on a new tab
      }
      else {
        windowActions.handleUpdateWindow({ currentNode: fileId, title: windowTitle, icon: windowIcon, src, children, isUnique, type: fileType, nodeDepth })
      }

    } catch (error) {
      console.error('Error opening window:', error);
    }
  }
};

export default handleOpenFile;