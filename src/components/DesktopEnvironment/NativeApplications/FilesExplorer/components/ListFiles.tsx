import SystemFile from './SystemFile';
import handleOpenFile from '../utils/handleOpenFile';
import actions from '@/store/actions';
import { FileNode } from '@/store/slices/file';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { isLocalHost, useClickOutside, useIsMobile } from '@/shared';
import { StylesConfig } from './SystemFile/StyledFileWrapper/fileWrapperStyle';
import { stringNormalizer } from '@/shared/utils/stringFunctions';
import { WindowTitle } from '@/store/slices/window';
import { useMemo } from 'react';
import { usersSelectors } from '@/store/slices/users/userSlice';
import User from '@/store/utils/db.types';

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
  containerRef?: React.RefObject<HTMLDivElement>;
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
  containerRef,
}: ListFilesProps) => {
  if (content === undefined || content?.length < 0) return;

  // redux

  const currentUserId = useSelector(
    (state: RootState) => state.users.currentUserId,
  );
  const currentUser = useSelector((state: RootState) =>
    usersSelectors.selectById(state, currentUserId),
  ) as User;

  // window actions

  const windowActions = actions.useWindowActions();
  const { handleUpdateWindow, handleOpenWindow } = windowActions;
  const typeToIcon = {
    app: 'html-file',
    folder: 'folder',
    notFound: 'blank-icon',
    test: 'blank-icon',
  };

  // constantes

  const userRoles = currentUser?.config.roles ?? ['guest'];

  const contentFiltered = useMemo(() => {
    if (!filters) return content;

    const filtersArray = (Array.isArray(filters) ? filters : [filters])
      .map((f) => String(f).trim())
      .filter(Boolean)
      .map(stringNormalizer);

    if (filtersArray.length === 0) return content;

    return content.filter((item: FileNode) => {
      const allTitles = Object.values(item?.title ?? {}).join(' ');
      const normTitle = stringNormalizer(allTitles);

      return filtersArray.every((filter) => normTitle.includes(filter));
    });
  }, [content, filters]);

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
        contentKey,
        nodeDepth,
        initialDimensions,
        owner,
        permission,
        hidden,
      }: FileNode,
      windowIndex: number,
    ) => {
      if (fileId === undefined || fileId === null || hidden === true)
        return null;
      const finalIcon =
        icon ?? typeToIcon[type as keyof typeof typeToIcon] ?? 'window-icon';
      const iconTitle =
        (title as WindowTitle)?.por ?? (title as WindowTitle)?.eng;
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
          contentKey,
          currentNode,
          windowTitle,
          windowIcon,
          openMode,
          src,
          isUnique,
          initialStates,
          userRoles,
          owner,
          permission,
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
          title={windowTitle}
          icon={finalIcon}
          stylesConfig={stylesConfig}
          isDoubleClick={isDoubleClick}
          isMobile={isMobile}
          onClick={handleClick}
        />
      );
    },
  );

  return <ul className={className ?? 'files-container'}>{mapContent}</ul>;
};

export default ListFiles;
