import React from 'react';
import SystemFile from './SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import { placeholder } from '../../../data/filesData';

const FilesList = ({
  id,
  language,
  windowList,
  children,
  fileClassName,
  filesActions,
  dataInitialDimension,
  handleOpenWindow,
}) => {
  if (children === undefined || children.length < 0) return;

  const handleNewFile =
    filesActions && typeof filesActions.handleNewFile === 'function'
      ? filesActions.handleNewFile
      : () => {};
  
  return (
    <div
      className={`${id === 'desktop' ? 'background' : fileClassName}`}
      data-initial-dimension={dataInitialDimension}
    >
      {children.map(
        ({ id, title, icon, windowParams, isUnique, children }, index) => {
          const finalIcon = icon || placeholder.icon;
          const iconTitle = language === 'POR' ? title.por : title.eng;
          const windowTitle = windowParams
            ? language === 'POR'
              ? windowParams.title.por
              : windowParams.title.eng
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
                handleOpenFile(
                  id,
                  windowTitle,
                  windowIcon,
                  src,
                  children,
                  windowList,
                  handleOpenWindow,
                  handleNewFile,
                  isUnique
                )
              }
            />
          );
        }
      )}
    </div>
  );
};

export default FilesList;
