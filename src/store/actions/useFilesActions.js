import { useDispatch } from 'react-redux';
import { addFile, removeFile, sortFiles } from '../slices/file/filesSlice';


const useFilesActions = () => {
  const dispatch = useDispatch();

  const handleNewFile = (newFileData, currentNode, nodeDepth) => {
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