import React, { useEffect, useRef, useState } from 'react';
import useClickOutside from '@/shared/hooks/useClickOutside';
import { rootFolder } from '@/data/filesData';
import actions from '@/store/actions';

const ContextMenu = ({ position, items, target, onClose, language }) => {
  const menuRef = useRef(null);
  const dataInfo = useRef(null);
  const { x, y } = position;
  const [iconsData, setIconsData] = useState([...children]);
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

  useEffect(() => {
    setIconsData((prevIcons) => {
      if (prevIcons.length === 0) return prevIcons;
      const newFileIcon =
        prevIcons.length > 0 ? prevIcons[prevIcons.length - 1] : null;
      const sortedIcons = [...prevIcons.slice(0, -1)].sort((a, b) =>
        ascendingOrder ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      );

      return newFileIcon ? [...sortedIcons, newFileIcon] : sortedIcons;
    });
  }, [ascendingOrder]);

  useClickOutside(menuRef, onClose);
  const desktopIconActions = actions.useFilesActions();
  const windowActios = actions.useWindowActions();
  const handleSortIcons = desktopIconActions.handleSortFiles;
  const handleViewItem = windowActios.handleOpenWindow;
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
                  handleViewItem({ ...dataInfo.current });
                  break;
                case 'sort':
                  handleSortIcons();

                  break;
                case 'refresh':
                  window.location.reload();
                  break;
                case 'change-background':
                  handleViewItem({
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
            {action.icon && (
              <i className={`icon ${action.icon} context-menu-icon`}></i>
            )}
            <span>{action.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;
