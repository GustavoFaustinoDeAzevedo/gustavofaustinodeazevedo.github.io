import React, { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { desktopIconsData } from '../../data/desktopIconsData';

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
  const [ascendingOrder, setAscendingOrder] = useState(true);

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
      } catch (error) {
        console.error('Failed to parse dataset info: ', error);
      }
    }
  }, [x, y, dataInfo]);

  const handleToggleSort = () => {
    const newFileIcon = desktopIconsData.pop();
    desktopIconsData.sort((a, b) =>
      ascendingOrder ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );
    desktopIconsData.push(newFileIcon);
    setAscendingOrder(!ascendingOrder);
  };

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
              switch (action.type) {
                case 'view-action':
                  action.handler({ state, dispatch, ...dataInfo.current });
                  break;
                case 'sort':
                  handleToggleSort();

                  break;
                case 'refresh':
                  window.location.reload();
                  break;
                case 'change-background':
                  action.handler({
                    state,
                    dispatch,
                    id: 'background-color-picker',
                  });
                  break;
                default:
                  onClose();
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
