import { createSlice } from '@reduxjs/toolkit';
import { rootFolder } from '../../data/filesData';

const newFile = (files, fileToBeAdded) => {
  const children = [...files, fileToBeAdded];
  if (children.length >= 2) {
    const lastIndex = children.length - 1;
    const secondLastIndex = children.length - 2;

    [children[secondLastIndex], children[lastIndex]] = [children[lastIndex], children[secondLastIndex]];
  }
  return children;
};

const toggleSort = (files, sortType) => {
  const sortedFiles = [...files];
  if (sortedFiles.length === 0) return sortedFiles;

  const lastElement = sortedFiles.pop();

  sortedFiles.sort((a, b) =>
    sortType === "asc"
      ? a.id.localeCompare(b.id)
      : b.id.localeCompare(a.id)
  );
  sortedFiles.push(lastElement);
  return sortedFiles;
};

/*
||============================================================================================================================================||
||============================================================================================================================================||
*/
const fileSlice = createSlice({
  name: 'file',
  initialState: {
    filesList: rootFolder,
    sort: "asc",
  },
  reducers: {
    addFile: (state, action) => {
      state.filesList = newFile(state.filesList, action.payload);
    },
    removeFile: (state, action) => {
      state.filter(file => file.id !== action.payload.id);
    },
    sortFiles: (state) => {
      state.filesList = toggleSort(state.filesList, state.sort);
      state.sort === "asc" ? "desc" : "asc";
    },
  },
});

export const { addFile, removeFile, sortFiles } = fileSlice.actions;
export default fileSlice.reducer;
