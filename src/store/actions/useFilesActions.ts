import { useDispatch } from 'react-redux';
import { addFile, removeFile, sortFiles } from '../slices/file/filesSlice';
import { FileNode } from '@/data/filesData';

const useFilesActions = () => {
  const dispatch = useDispatch();

  const handleNewFile = (
    newFileData: FileNode,
    currentNode: string,
    nodeDepth: number
  ) => {
    dispatch(addFile({ newFileData, currentNode, nodeDepth }));
  };

  const handleRemoveFile = (fileToRemove: FileNode) => {
    dispatch(removeFile(fileToRemove));
  };

  const handleSortFiles = () => {
    dispatch(sortFiles());
  };
  return { handleNewFile, handleRemoveFile, handleSortFiles };
};

export default useFilesActions;
