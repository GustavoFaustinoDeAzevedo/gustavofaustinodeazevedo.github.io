import SystemFile from './SystemFile/SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import { placeholder } from '../../../data/filesData';

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
          const finalIcon = icon || placeholder.icon;
          const iconTitle = language === 'POR' ? title?.por : title?.eng;
          const windowTitle = windowMask
            ? language === 'POR'
              ? windowMask.title?.por
              : windowMask.title?.eng
            : iconTitle;
          const windowIcon = windowMask?.icon || icon || 'window-icon';
          const src = windowMask?.src || '';

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
