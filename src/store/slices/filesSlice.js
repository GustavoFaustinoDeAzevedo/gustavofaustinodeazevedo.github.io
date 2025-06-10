import { createSlice } from '@reduxjs/toolkit';
import { filesData } from '../../data/filesData';

const newFile = (files, fileToBeAdded) => {
  const filesData = [...files, fileToBeAdded];
  if (filesData.length >= 2) {
    const lastIndex = filesData.length - 1;
    const secondLastIndex = filesData.length - 2;

    [filesData[secondLastIndex], filesData[lastIndex]] = [filesData[lastIndex], filesData[secondLastIndex]];
  }
  return filesData;
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
    filesList: filesData,
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
