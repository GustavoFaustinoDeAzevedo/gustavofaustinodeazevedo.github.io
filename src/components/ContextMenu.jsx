import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ x, y, items, target, onClose }) => {
  const menuRef = useRef(null);

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
  }, [x, y]);

  return (
    <div ref={menuRef} className="context-menu active">
      {/* {items.map((item, index) => {
        if (item.separator) {
          return (
            <div key={`sep-${index}`} className="context-menu-separator" />
          );
        }
        return (
          <div
            key={item.action}
            className="context-menu-item"
            onClick={() => {
              item.handler(target);
              onClose();
            }}
          >
            {item.icon && <i className={item.icon}></i>}
            <span>{item.label}</span>
          </div>
        );
      })} */}
    </div>
  );
};

export default ContextMenu;
