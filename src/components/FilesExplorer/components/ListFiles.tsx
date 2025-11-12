import SystemFile from './SystemFile';
import handleOpenFile, { HandleOpenFileProps } from '../utils/handleOpenFile';
import actions from '@/store/actions';
import { FileNode } from '@/store/slices/file';
import { Language } from '@/store/slices/settings';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useIsMobile } from '@/shared';
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
  if (children === undefined || children.length < 0) return;
  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow, handleOpenWindow } = windowActions;
  const typeToIcon = {
    app: 'html-file',
  };

  const childrenFiltered = (() => {
    if (!filters || filters.length === 0) return children;
    let filtersArray = filters as string[];
    if (!Array.isArray(filters)) {
      filtersArray = [filters as string];
    }
    return children.filter((item) =>
      filtersArray.every((filter: string) =>
        stringNormalizer(item.title[language]).includes(
          stringNormalizer(filter)
        )
      )
    );
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
          },
          windowIndex
        ) => {
          if (fileId === undefined || fileId === null) return null;
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
