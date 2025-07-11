import SystemFile from './SystemFile/SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import { placeholder } from '../../../data/filesData';
import { useMemo } from 'react';

const FilesList = ({
  nodeId,
  language,
  windowList,
  children,
  fileClassName,
  filesActions,
  dataInitialDimension,
  windowActions,
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
          { id, title, icon, type, windowMask, isUnique, children, index },
          windowIndex
        ) => {
          const finalIcon = icon ?? typeToIcon[type] ?? 'window-icon';
          const iconTitle = language === 'por' ? title?.por : title?.eng;
          const windowTitle = windowMask?.title ?? title;

          const windowIcon =
            windowMask?.icon ?? icon ?? typeToIcon[type] ?? 'window-icon';
          const src = windowMask?.src ?? '';

          return (
            <SystemFile
              key={`file-${id}-${windowIndex}`}
              id={id}
              title={iconTitle}
              icon={finalIcon}
              language={language}
              onClick={() =>
                handleOpenFile({
                  id,
                  nodeId,
                  windowTitle,
                  language,
                  windowIcon,
                  src,
                  isUnique,
                  windowList,
                  children,
                  handleNewFile,
                  windowActions,
                  handleWindowUpdate,
                  fileType: type,
                  nodeType,
                  index,
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
