import { useDispatch } from 'react-redux';
import { newFile, removeFile } from '../slices/file/filesSlice';
import { FileNode } from '@/store/slices/file';

const useFilesActions = () => {
  const dispatch = useDispatch();

  const handleNewFile = (path: string, data: FileNode) => {
    dispatch(newFile({ path, data }));
  };

  const handleRemoveFile = (fileToRemove: FileNode) => {
    dispatch(removeFile(fileToRemove));
  };

  return { handleNewFile, handleRemoveFile };
};

export default useFilesActions;
