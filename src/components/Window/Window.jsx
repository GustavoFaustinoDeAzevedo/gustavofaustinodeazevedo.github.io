import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import useClickOutside from '../../hooks/useClickOutside';

gsap.registerPlugin(Draggable);

const Window = ({
  id,
  title,
  zIndex,
  isOpen,
  children,
  desktopRef,
  ...handlers
}) => {
  const {
    isFocused,
    isMinimized,
    isMaximized,
    onFocus,
    onUnfocus,
    onMinimize,
    onMaximize,
    onClose,
    onContextMenu,
  } = handlers;

  const windowRef = useRef(null);
  const headerRef = useRef(null);

  const className = `window 
  ${isFocused ? 'focus' : ''}
  ${isMinimized ? 'minimized' : ''} 
  ${isOpen ? 'open' : ''}
  ${isMaximized ? 'maximized' : ''}`;

  useEffect(() => {
    if (windowRef.current && headerRef.current) {
      // Initialize draggable
      Draggable.create(windowRef.current, {
        trigger: headerRef.current,
        type: 'x,y',
        bounds: desktopRef.current,
        inertia: true,
        onPress: onFocus,
        onDragStart: onFocus,
      });

      // Random initial position
      const desktop = document.querySelector('.desktop');
      const x = Math.floor(Math.random() * (desktop.offsetWidth / 2));
      const y = Math.floor(Math.random() * (desktop.offsetHeight / 4));

      gsap.set(windowRef.current, { x, y });
    }
  }, [desktopRef, isOpen]);

  useClickOutside(windowRef, onUnfocus, isFocused);

  return (
    <div
      ref={windowRef}
      className={className}
      style={{ zIndex: zIndex }}
      onContextMenu={onContextMenu}
    >
      <div className="window-header">
        <span
          onTouchStart={onFocus}
          onClick={onFocus}
          onMouseDown={onFocus}
          ref={headerRef}
          className="window-title"
        >
          {title}
        </span>
        <div className="window-controls">
          <button className="minimize" onClick={onMinimize}>
            <i className="icon minimize"></i>
          </button>
          <button className="maximize" onClick={onMaximize}>
            {isMaximized ? (
              <i className="icon restore"></i>
            ) : (
              <i className="icon maximize"></i>
            )}
          </button>
          <button className="close" onClick={onClose}>
            <i className="icon close"></i>
          </button>
        </div>
      </div>
      <div
        onTouchStart={onFocus}
        onMouseDown={onFocus}
        onClick={onFocus}
        className="window-content"
      >
        {children || <DefaultContent id={id} />}
      </div>
    </div>
  );
};

function DefaultContent({ id }) {
  switch (id) {
    case 'about':
      return (
        <>
          <h2>👋 Hello, I'm a Developer</h2>
          <p className="about-text"></p>
        </>
      );
    case 'projects':
      return (
        <div className="project-grid">
          <article className="project-card">
            <h3>Project One</h3>
            <p>Project Card Example</p>
          </article>
        </div>
      );
    case 'skills':
      return (
        <ul className="skills-list">
          <li>HTML5 & CSS3</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>UI/UX Design</li>
          <li>Responsive Design</li>
        </ul>
      );
    case 'contact':
      return (
        <form className="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      );
    default:
      return null;
  }
}

export default Window;
