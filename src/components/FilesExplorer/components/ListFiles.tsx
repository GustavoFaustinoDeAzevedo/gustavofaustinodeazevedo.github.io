import SystemFile from './SystemFile';
import handleOpenFile, { HandleOpenFileProps } from '../utils/handleOpenFile';
import actions from '@/store/actions';
import { FileNode } from '@/store/slices/file';
import { Language } from '@/store/slices/settings';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { isLocalHost, useIsMobile } from '@/shared';
import { StylesConfig } from './SystemFile/StyledFileWrapper/fileWrapperStyle';
import { filter } from 'mathjs';
import { stringNormalizer } from '@/shared/utils/stringFunctions';

type ListFilesProps = {
  handleGlobalClick?: () => void;
  currentNode: string;
  language: Language;
  children: FileNode[];
  className?: string;
  stylesConfig?: StylesConfig;
  openMode?: string;
  nodeType?: string;
  filters?: string | string[];
  doubleClickToOpen?: boolean;
};

const ListFiles = ({
  handleGlobalClick,
  currentNode,
  language,
  children,
  className = '',
  stylesConfig,
  openMode,
  nodeType = 'desktop',
  filters,
  doubleClickToOpen,
}: ListFilesProps) => {
  if (children === undefined || children?.length < 0) return;
  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow, handleOpenWindow } = windowActions;
  const typeToIcon = {
    app: 'html-file',
  };

  const childrenFiltered = (() => {
    if (!filters) return children;

    const filtersArray = (Array.isArray(filters) ? filters : [filters])
      .map((f) => String(f).trim())
      .filter(Boolean)
      .map(stringNormalizer);

    if (filtersArray.length === 0) return children;

    return children.filter((item) => {
      const title = String(item?.title?.[language] ?? '');
      const normTitle = stringNormalizer(title);
      return filtersArray.every((filter) => normTitle.includes(filter));
    });
  })();

  const isDoubleClick =
    doubleClickToOpen ??
    useSelector((state: RootState) => state?.settings.isDoubleClick);

  const isMobile = useIsMobile();

  return (
    <ul className={className ?? 'files-container'}>
      {childrenFiltered?.map(
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
            permission,
          },
          windowIndex
        ) => {
          if (
            fileId === undefined ||
            fileId === null ||
            (permission === 'admin' && !isLocalHost)
          )
            return null;
          const finalIcon =
            icon ??
            typeToIcon[type as keyof typeof typeToIcon] ??
            'window-icon';
          const iconTitle = language === 'por' ? title?.por : title?.eng;
          const windowTitle = windowMask?.title ?? title;

          const windowIcon =
            windowMask?.icon ??
            icon ??
            typeToIcon[type as keyof typeof typeToIcon] ??
            'window-icon';
          const src = windowMask?.src ?? '';

          const handleClick = () => {
            handleGlobalClick?.();
            handleOpenFile({
              fileId,
              currentNode,
              windowTitle,
              windowIcon,
              openMode,
              src,
              isUnique,
              initialStates,
              children,
              type,
              nodeType,
              initialDimensions,
              nodeDepth,
              handleUpdateWindow,
              handleOpenWindow,
            });
          };

          return (
            <SystemFile
              key={`file-${fileId}-${windowIndex}`}
              fileId={fileId}
              title={iconTitle}
              icon={finalIcon}
              stylesConfig={stylesConfig}
              isDoubleClick={isDoubleClick}
              isMobile={isMobile}
              onClick={handleClick}
            />
          );
        }
      )}
    </ul>
  );
};

export default ListFiles;
