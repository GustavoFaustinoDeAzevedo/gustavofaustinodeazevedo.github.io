import { createSlice } from '@reduxjs/toolkit';
import { rootFolder } from '../../data/filesData';
import set from 'lodash/set';

const newFile = (node, fileToBeAdded, index) => {
  const children = [...(node.children || []), { ...fileToBeAdded, index }];

  if (children.length >= 2) {
    const lastIndex = children.length - 1;
    const secondLastIndex = children.length - 2;

    [children[secondLastIndex], children[lastIndex]] = [children[lastIndex], children[secondLastIndex]];
  }
  return children;
};

const updateChildrenById = (node, targetId, fileToBeAdded, index) => {
  if (node.id === targetId && node.index === (index - 1)) {

    node.children = newFile(node, fileToBeAdded, index);
    return true;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {

      const updated = updateChildrenById(child, targetId, fileToBeAdded, index);
      if (updated) return true;
    }
  }

  return false;
}



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

const handleNestedEntities = (obj, index = 0) => {
  const children = obj.children.map((file) => {
    if (file.children) {
      file = { ...file, index: index + 1 };
      return handleNestedEntities(file, index + 1);
    }

    return { ...file, index: index + 1 };
  });

  return { ...obj, children };
};

/*
||============================================================================================================================================||
||============================================================================================================================================||
*/
const fileSlice = createSlice({
  name: 'file',
  initialState: {
    filesList: handleNestedEntities(rootFolder),
    sort: "asc",
  },
  reducers: {
    addFile: (state, action) => {
      const { newFileData, nodeId, index } = action.payload;
      updateChildrenById(state.filesList, nodeId, newFileData, index)
    },
    removeFile: (state, action) => {
      const removeById = (node, id) => {
        if (!node.children) return;
        node.children = node.children.filter(child => child.id !== id);
        node.children.forEach(child => removeById(child, id));
      };
      removeById(state.filesList, action.payload.id);
    },
    sortFiles: (state) => {
      state.filesList.children = toggleSort(state.filesList.children, state.sort);
      state.sort = state.sort === "asc" ? "desc" : "asc";
    },
  },
});

export const { addFile, removeFile, sortFiles } = fileSlice.actions;
export default fileSlice.reducer;
