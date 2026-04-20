import { ListFiles } from '@/components/DesktopEnvironment/NativeApplications/FilesExplorer';

// import displayWindowContent from '../utils/displayWindowContent';

import { returnWindowContent } from '@/store/slices/window/windowSlice.registry';
import { Permission } from '@/store/slices/file';
import { StylesConfig } from '@/components/DesktopEnvironment/NativeApplications/FilesExplorer/components/SystemFile/StyledFileWrapper/fileWrapperStyle';

/** O windowId tem o formato: window#contentId#[randomString] para que cada janela possa ser uma janela única.
 * O contentId representa a ID do conteúdo da janela que será renderizado.
 * O randomString representa uma string aleatória que é criada de acordo com a data, hora e minuto atual usada para identificar a janela.
 * O calculo pode ser encontrado em file:scr/store/settings/settingsSlice.ts
 */

const WindowContent = ({
  windowId,
  contentKey,
  currentNode,
  src,
  permission,
  owner,
  content,
  type,
}: {
  windowId: string;
  contentKey: string;
  currentNode: string;
  permission?: Permission;
  owner?: string;
  src?: string;
  content?: any;
  type?: string;
}) => {
  //const contentId = windowId.split('#')[1];

  const stylesConfig: StylesConfig = {
    $direction: 'horizontal',
    $size: { width: '80%', height: '100%' },
    $fontSize: '0.8rem',
    $fontWeight: 'normal',
    $iconSize: '2rem',
    $color: 'var(--color-text)',
    $backgroundColor: { default: 'transparent', hover: '#ffffff1a' },
    $borderRadius: '0rem',
    $togglers: {
      enableFilter: false,
      enableShadow: false,
      enableBorder: true,
      enableTextShadow: true,
      enableBorderRadius: true,
      enableTransform: false,
      enableSmoothTransition: true,
    },
    gap: '2px',
  };

  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    gap: '3rem',
    padding: '2rem',
  };

  if (type === 'folder') {
    return (
      <ListFiles
        style={wrapperStyle}
        stylesConfig={stylesConfig}
        currentNode={currentNode}
        content={content}
        nodeType={type}
        openMode={'window'}
        doubleClickToOpen={true}
      />
    );
  }

  const windowContent = returnWindowContent(contentKey, {
    windowId: currentNode,
    src,
    type,
    content,
    permission,
    owner,
  });

  return windowContent;
};

export default WindowContent;
