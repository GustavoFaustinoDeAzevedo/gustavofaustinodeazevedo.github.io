import { useDispatch } from 'react-redux';
import { addFile, removeFile, sortFiles } from '../slices/filesSlice';


const useFilesActions = () => {
  const dispatch = useDispatch();

  const handleNewFile = (newFileData, nodeId, index) => {
    console.log("Adding file to node:", nodeId, "at index:", index);
    dispatch(addFile({ newFileData, nodeId, index }));
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