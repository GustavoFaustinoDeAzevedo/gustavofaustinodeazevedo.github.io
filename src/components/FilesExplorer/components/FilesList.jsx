import SystemFile from './SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import { placeholder } from '../../../data/filesData';
import { useMemo } from 'react';
import actions from '@/store/actions';

const FilesList = ({
  currentNode,
  language,
  children,
  fileClassName,
  filesActions,
  dataInitialDimension,
  // windowActions,
  openMode,
  backgroundColorContrast,
  handleWindowUpdate = () => {},
  nodeType = 'desktop',
}) => {
  if (children === undefined || children.length < 0) return;
  const { handleNewFile } = filesActions;
  const typeToIcon = {
    app: 'html-file',
  };

  return (
    <div
      className={`${fileClassName}`}
      data-initial-dimension={dataInitialDimension}
    >
      {children.map(
        (
          {
            fileId,
            title,
            icon,
            type,
            windowMask,
            isUnique,
            children,
            nodeDepth,
            initialDimensions,
          },
          windowIndex
        ) => {
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
              backgroundColorContrast={backgroundColorContrast}
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
                  children,
                  handleNewFile,
                  windowActions,
                  handleWindowUpdate,
                  fileType: type,
                  nodeType,
                  initialDimensions,
                  nodeDepth,
                })
              }
            />
          );
        }
      )}
    </div>
  );
};

export default FilesList;
