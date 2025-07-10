import { createSlice } from '@reduxjs/toolkit';
import { rootFolder } from '../../data/filesData';
import set from 'lodash/set';

const newFile = (node, fileToBeAdded, nodeDepth) => {
  const children = [...(node.children || []), { ...fileToBeAdded, nodeDepth }];

  if (children.length >= 2) {
    const lastIndex = children.length - 1;
    const secondLastIndex = children.length - 2;

    [children[secondLastIndex], children[lastIndex]] = [children[lastIndex], children[secondLastIndex]];
  }
  return children;
};

const updateChildrenById = (node, targetId, fileToBeAdded, nodeDepth) => {
  if (node.fileId === targetId && node.nodeDepth === (nodeDepth - 1)) {

    node.children = newFile(node, fileToBeAdded, nodeDepth);
    return true;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {

      const updated = updateChildrenById(child, targetId, fileToBeAdded, nodeDepth);
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
      ? a.fileId.localeCompare(b.fileId)
      : b.fileId.localeCompare(a.fileId)
  );
  sortedFiles.push(lastElement);
  return sortedFiles;
};

const handleNestedEntities = (obj, nodeDepth = 0) => {
  const children = obj.children.map((file) => {
    if (file.children) {
      file = { ...file, nodeDepth: nodeDepth + 1 };
      return handleNestedEntities(file, nodeDepth + 1);
    }

    return { ...file, nodeDepth: nodeDepth + 1 };
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
    rootPath: 'root/',
    defaultPath: 'root/users/guests/desktop',
    sort: "asc", //temporary
  },
  reducers: {
    addFile: (state, action) => {
      const { newFileData, currentNode, nodeDepth } = action.payload;
      updateChildrenById(state.filesList, currentNode, newFileData, nodeDepth)
    },
    removeFile: (state, action) => {
      const removeById = (node, fileId) => {
        if (!node.children) return;
        node.children = node.children.filter(child => child.fileId !== fileId);
        node.children.forEach(child => removeById(child, fileId));
      };
      removeById(state.filesList, action.payload.fileId);
    },
    sortFiles: (state) => {
      state.filesList.children = toggleSort(state.filesList.children, state.sort);
      state.sort = state.sort === "asc" ? "desc" : "asc";
    },
  },
});

export const { addFile, removeFile, sortFiles } = fileSlice.actions;
export default fileSlice.reducer;
