import { ListFiles } from '@components/FilesExplorer';

// import displayWindowContent from '../utils/displayWindowContent';

import { returnWindowContent } from '@/store/slices/window/windowSlice.data';

/** O windowId tem o formato: window#contentId#[randomString] para que cada janela possa ser uma janela única.
 * O contentId representa a ID do conteúdo da janela que será renderizado.
 * O randomString representa uma string aleatória que é criada de acordo com a data, hora e minuto atual usada para identificar a janela.
 * O calculo pode ser encontrado em file:scr/store/settings/settingsSlice.ts
 */
const WindowContent = ({
  windowId,
  currentNode,
  src,
  children,
  windowActions,
  type,
  language,
  windowList,
  filesActions,
}) => {
  const contentId = windowId.split('#')[1];
  const windowContent = returnWindowContent(contentId, {
    windowId: currentNode,
    language,
    src,
    type,
    windowActions,
    children,
  });

  const updateWindowHandler = (data) => windowActions?.updateWindowState(data);

  return (
    windowContent || (
      <ListFiles
        currentNode={currentNode}
        language={language}
        windowList={windowList}
        openMode={null}
        children={children}
        filesActions={filesActions}
        windowActions={windowActions}
        handleWindowUpdate={updateWindowHandler}
        nodeType={type}
        dataInitialDimension='{"width": "1000px", "height": "600px"}'
        fileClassName="files-explorer"
      />
    )
  );
};

export default WindowContent;
