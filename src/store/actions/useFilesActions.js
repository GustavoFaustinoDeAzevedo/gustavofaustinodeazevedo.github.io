import { useDispatch } from 'react-redux';
import { addFile, removeFile, sortFiles } from '../slices/filesSlice';


const useFilesActions = () => {
  const dispatch = useDispatch();

  const handleNewFile = (newFileData, currentNode, nodeDepth) => {
    console.log("Adding file to node:", currentNode, "at depth:", nodeDepth);
    dispatch(addFile({ newFileData, currentNode, nodeDepth }));
  };

  const handleRemoveFile = (fileToRemove) => {
    dispatch(removeDesktop(fileToRemove));
  };

  const handleSortFiles = () => {
    dispatch(sortDesktopIcons());
  };
  return { handleNewFile, handleRemoveFile, handleSortFiles };
};

export default useFilesActions;