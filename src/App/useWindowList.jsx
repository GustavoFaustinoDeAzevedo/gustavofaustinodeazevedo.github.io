import { useMemo } from 'react';
import Window from '../components/Window';

export const useWindowList = (
  desktopRef,
  windowList,
  focusedWindow,
  language,
  handleOpenWindow,
  handleFocusWindow,
  handleResetFocus,
  handleCloseWindow,
  handleUpdateWindow
) => {
  return useMemo(
    () =>
      windowList
        .filter(({ id }) => id !== 'new' && id !== 'placeholder')
        .map(
          (
            { id, title, windowState, position, size, zIndex, icon, content },
            index
          ) => (
            <Window
              key={id}
              id={id}
              icon={icon}
              desktopRef={desktopRef}
              title={title}
              isFocused={focusedWindow === id}
              isMinimized={windowState.minimized}
              isMaximized={windowState.maximized}
              x={position.x}
              y={position.y}
              startX={position.startX}
              startY={position.startY}
              startWidth={size.startWidth}
              startHeight={size.startHeight}
              isRequestingOpen={windowState.requestingOpen}
              isRequestingRestore={windowState.requestingRestore}
              isRequestingClose={windowState.requestingClose}
              isRequestingMaximize={windowState.requestingMaximize}
              isRequestingMinimize={windowState.requestingMinimize}
              width={size.width}
              height={size.height}
              isOpen={windowState.open}
              zIndex={zIndex}
              language={language}
              index={index}
              content={content}
              onUpdateWindow={(data) => handleUpdateWindow(data)}
              onFocus={() => handleFocusWindow(id)}
              onUnfocus={() => handleResetFocus()}
              onClose={() => handleCloseWindow(id)}
            />
          )
        ),
    [
      windowList,
      language,
      focusedWindow,
      desktopRef,
      handleFocusWindow,
      handleResetFocus,
      handleCloseWindow,
    ]
  );
};
