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
  handleUpdate = () => {},
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
          { id, title, icon, type, windowParams, isUnique, children },
          index
        ) => {
          const finalIcon = icon || placeholder.icon;
          const iconTitle = language === 'POR' ? title?.por : title?.eng;
          const windowTitle = windowParams
            ? language === 'POR'
              ? windowParams.title?.por
              : windowParams.title?.eng
            : iconTitle;
          const windowIcon = windowParams?.icon || icon || 'window-icon';
          const src = windowParams?.src || '';

          return (
            <SystemFile
              key={`file-${id}-${index}`}
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
                  handleUpdate,
                  fileType: type,
                  nodeType,
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
