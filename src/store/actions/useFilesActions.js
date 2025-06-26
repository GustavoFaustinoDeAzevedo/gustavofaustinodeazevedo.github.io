import { useDispatch } from 'react-redux';
import { addFile, removeFile, sortFiles } from '../slices/filesSlice';


const useFilesActions = () => {
  const dispatch = useDispatch();

  const handleNewFile = (newFileData, nodeId) => {
    dispatch(addFile({newFileData, nodeId}));
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