import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ x, y, items, target, onClose, language }) => {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className="context-menu active">
      {language.includes('ENG') ? (
        <p>Context Menu Example</p>
      ) : (
        <p>Exemplo de Menu de Contexto</p>
      )}
      <div className="context-menu-separator" />
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
