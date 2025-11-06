import SystemFile from './SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import { placeholder } from '@/data/filesData';
import { useMemo } from 'react';
import actions from '@/store/actions';

const ListFiles = ({
  currentNode,
  language,
  children,
  className = '',
  openMode,
  nodeType = 'desktop',
  filters = [],
}) => {
  if (children === undefined || children.length < 0) return;
  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow, handleOpenWindow } = windowActions;
  const typeToIcon = {
    app: 'html-file',
  };

  return (
    <ul className={className ?? 'files-container'}>
      {children.map(
        (
          {
            fileId,
            title,
            icon,
            type,
            windowMask,
            isUnique,
            initialStates,
            children,
            nodeDepth,
            initialDimensions,
          },
          windowIndex
        ) => {
          if (
            filters.length > 0 &&
            (!filters.includes(type) || !filters.includes(title[language]))
          )
            return null;
          const windowActions = actions.useWindowActions();
          const finalIcon = icon ?? typeToIcon[type] ?? 'window-icon';
          const iconTitle = language === 'por' ? title?.por : title?.eng;
          const windowTitle = windowMask?.title ?? title;

          const windowIcon =
            windowMask?.icon ?? icon ?? typeToIcon[type] ?? 'window-icon';
          const src = windowMask?.src ?? '';

          return (
            <SystemFile
              key={`file-${fileId}-${windowIndex}`}
              fileId={fileId}
              title={iconTitle}
              icon={finalIcon}
              language={language}
              onClick={() =>
                handleOpenFile({
                  fileId,
                  currentNode,
                  windowTitle,
                  language,
                  windowIcon,
                  openMode,
                  src,
                  isUnique,
                  initialStates,
                  children,
                  fileType: type,
                  nodeType,
                  initialDimensions,
                  nodeDepth,
                  handleUpdateWindow,
                  handleOpenWindow,
                })
              }
            />
          );
        }
      )}
    </ul>
  );
};

export default ListFiles;
