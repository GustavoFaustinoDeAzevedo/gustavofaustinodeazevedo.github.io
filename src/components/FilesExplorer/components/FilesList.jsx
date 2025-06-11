import React from 'react';
import SystemFile from './SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import { placeholder } from '../../../data/filesData';

const FilesList = ({
  language,
  windowList,
  filesData,
  fileClassName,
  filesActions,
  dataInitialDimension,
  handleOpenWindow,
}) => {
  if (filesData === undefined || filesData.length < 0) return;

  const handleNewFile =
    filesActions && typeof filesActions.handleNewFile === 'function'
      ? filesActions.handleNewFile
      : () => {};

  return (
    <div
      className={fileClassName}
      data-initial-dimension={dataInitialDimension}
    >
      {filesData.map(({ id, title, icon, windowParams, filesData }, index) => {
        const finalIcon = icon || placeholder.icon;
        const iconTitle = language === 'POR' ? title.por : title.eng;
        const windowTitle = windowParams
          ? language === 'POR'
            ? windowParams.title.por
            : windowParams.title.eng
          : iconTitle;
        const windowIcon = windowParams?.icon || icon || 'icon window-icon';
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
                filesData,
                windowList,
                handleOpenWindow,
                handleNewFile
              )
            }
          />
        );
      })}
    </div>
  );
};

export default FilesList;
