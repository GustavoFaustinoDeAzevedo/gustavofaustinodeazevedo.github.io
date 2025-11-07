import SystemFile from './SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import actions from '@/store/actions';
import { FileNode } from '@/store/slices/file';
import { Language } from '@/store/slices/settings';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useIsMobile } from '@/shared';
import { StylesConfig } from './SystemFile/StyledFileWrapper/fileWrapperStyle';

type ListFilesProps = {
  currentNode: string;
  language: Language;
  children: FileNode[];
  className?: string;
  stylesConfig?: StylesConfig;
  openMode?: string;
  nodeType?: string;
  filters?: string[];
  doubleClickToOpen?: boolean;
};

const ListFiles = ({
  currentNode,
  language,
  children,
  className = '',
  stylesConfig,
  openMode,
  nodeType = 'desktop',
  filters = [],
  doubleClickToOpen,
}: ListFilesProps) => {
  if (children === undefined || children.length < 0) return;
  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow, handleOpenWindow } = windowActions;
  const typeToIcon = {
    app: 'html-file',
  };

  const isDoubleClick =
    doubleClickToOpen ??
    useSelector((state: RootState) => state?.settings.isDoubleClick);

  const isMobile = useIsMobile();

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
            (!filters.includes(type as string) ||
              !filters.includes(title[language]))
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

          return (
            <SystemFile
              key={`file-${fileId}-${windowIndex}`}
              fileId={fileId}
              title={iconTitle}
              icon={finalIcon}
              stylesConfig={stylesConfig}
              isDoubleClick={isDoubleClick}
              isMobile={isMobile}
              onClick={() =>
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
