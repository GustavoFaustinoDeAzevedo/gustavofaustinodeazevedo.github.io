import { createSlice } from '@reduxjs/toolkit';
import { desktopIconsData } from '../../data/desktopIconsData';

const newIcon = (desktopIcons, iconToBeAdded) => {
  const iconsData = [...desktopIcons, iconToBeAdded];
  if (iconsData.length >= 2) {
    const lastIndex = iconsData.length - 1;
    const secondLastIndex = iconsData.length - 2;

    [iconsData[secondLastIndex], iconsData[lastIndex]] = [iconsData[lastIndex], iconsData[secondLastIndex]];
  }
  return iconsData;
};

const toggleSort = (desktopIcons, sortType) => {
  const sortedIcons = [...desktopIcons];
  if (sortedIcons.length === 0) return sortedIcons;

  const lastElement = sortedIcons.pop();

  sortedIcons.sort((a, b) =>
    sortType === "asc"
      ? a.id.localeCompare(b.id)
      : b.id.localeCompare(a.id)
  );
  sortedIcons.push(lastElement);
  return sortedIcons;
};

/*
||============================================================================================================================================||
||============================================================================================================================================||
*/
const iconSlice = createSlice({
  name: 'icon',
  initialState: {
    desktopIconList: desktopIconsData,
    sort: "asc",
  },
  reducers: {
    addDesktopIcon: (state, action) => {
      state.desktopIconList = newIcon(state.desktopIconList, action.payload);
    },
    removeDesktopIcon: (state, action) => {
      state.filter(icon => icon.id !== action.payload.id);
    },
    sortDesktopIcons: (state) => {
      state.desktopIconList = toggleSort(state.desktopIconList, state.sort);
      state.sort === "asc" ? "desc" : "asc";
    },
  },
});

export const { addDesktopIcon, removeDesktopIcon, sortDesktopIcons } = iconSlice.actions;
export default iconSlice.reducer;
