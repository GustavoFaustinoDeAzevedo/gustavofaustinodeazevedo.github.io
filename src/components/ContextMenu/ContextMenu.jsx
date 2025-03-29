import React, { useEffect, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const ContextMenu = ({
  x,
  y,
  items,
  dispatch,
  state,
  target,
  onClose,
  language,
}) => {
  const menuRef = useRef(null);
  const dataInfo = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x;
      let adjustedY = y;

      if (rect.right > viewportWidth) {
        adjustedX = x - rect.width;
      }
      if (rect.bottom > viewportHeight) {
        adjustedY = y - rect.height;
      }

      menuRef.current.style.left = `${adjustedX}px`;
      menuRef.current.style.top = `${adjustedY}px`;
    }

    let finalTarget = null;

    if (target && typeof target.closest === 'function') {
      finalTarget = target.closest('.parent');
    }
    if (finalTarget && finalTarget.dataset.info) {
      try {
        dataInfo.current = JSON.parse(finalTarget.dataset.info);
        console.log(dataInfo.current);
      } catch (error) {
        console.error('Failed to parse dataset info: ', error);
      }
    }
  }, [x, y, dataInfo]);

  useClickOutside(menuRef, onClose);

  return (
    <div ref={menuRef} className="context-menu active">
      {items.map((action, index) => {
        if (action.separator) {
          return (
            <div key={`sep-${index}`} className="context-menu-separator" />
          );
        }
        return (
          <div
            key={`item-${index}`}
            className="context-menu-item"
            onClick={() => {
              if (typeof action.handler === 'function') {
                action.handler({ state, dispatch, ...dataInfo.current });
              }
              if (onClose) {
                onClose();
              }
            }}
          >
            {action.icon && <i className={`icon ${action.icon}`}></i>}
            <span>{action.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;
