import SystemFile from './SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import actions from '@/store/actions';
import { FileNode } from '@/store/slices/file';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { isLocalHost, useIsMobile } from '@/shared';
import { StylesConfig } from './SystemFile/StyledFileWrapper/fileWrapperStyle';
import { stringNormalizer } from '@/shared/utils/stringFunctions';

type ListFilesProps = {
  handleGlobalClick?: () => void;
  currentNode: string;
  content?: FileNode[];
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
  content,
  className = '',
  stylesConfig,
  openMode,
  nodeType = 'desktop',
  filters,
  doubleClickToOpen,
}: ListFilesProps) => {
  if (content === undefined || content?.length < 0) return;

  // redux state
  const language = useSelector((state: RootState) => state?.settings.language);

  // window actions
  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow, handleOpenWindow } = windowActions;
  const typeToIcon = {
    app: 'html-file',
  };

  // contantes
  const contentFiltered = (() => {
    if (!filters) return content;

    const filtersArray = (Array.isArray(filters) ? filters : [filters])
      .map((f) => String(f).trim())
      .filter(Boolean)
      .map(stringNormalizer);

    if (filtersArray.length === 0) return content;

    return content.filter((item: FileNode) => {
      const title = String(item?.title?.[language] ?? '');
      const normTitle = stringNormalizer(title);
      return filtersArray.every((filter) => normTitle.includes(filter));
    });
  })();

  const isDoubleClick =
    doubleClickToOpen ??
    useSelector((state: RootState) => state?.settings.isDoubleClick);

  const isMobile = useIsMobile();

  // jsx
  const mapContent = contentFiltered?.map(
    (
      {
        fileId,
        title,
        icon,
        type,
        windowMask,
        isUnique,
        initialStates,
        content,
        nodeDepth,
        initialDimensions,
        permission,
      }: FileNode,
      windowIndex: number
    ) => {
      if (
        fileId === undefined ||
        fileId === null ||
        !isLocalHost // TODO: trocar por permissão do usuário
      )
        return null;
      const finalIcon =
        icon ?? typeToIcon[type as keyof typeof typeToIcon] ?? 'window-icon';
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
          content,
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
  );

  return <ul className={className ?? 'files-container'}>{mapContent}</ul>;
};

export default ListFiles;
