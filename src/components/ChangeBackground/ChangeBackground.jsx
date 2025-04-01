import React from 'react';
import { useDesktop } from '../../hooks/useDesktop';

export const ChangeBackground = () => {
  const { state, dispatch } = useDesktop();

  const handleBackgroundChange = (e) => {
    const newBackground = e.target.value;
    dispatch({ type: 'CHANGE_BACKGROUND', payload: newBackground });
  };

  return (
    <div className="change-background">
      <input
        id="background-color-picker"
        type="color"
        value={state.backgroundColor}
        onChange={handleBackgroundChange}
      />
    </div>
  );
};
