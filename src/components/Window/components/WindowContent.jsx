import { ListFiles } from '@/components/FilesExplorer';

import displayWindowContent from '../utils/displayWindowContent';

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
  //A windowId tem o formato: window#contentId#[randomString] para que cada janela possa ser uma janela única.
  //O contentId representa a ID do conteúdo da janela que será renderizado.
  //O randomString representa uma string aleatória que é criada de acordo com a data, hora e minuto atual usada para identificar a janela.
  //O calculo pode ser encontrado em file:scr/store/settings/settingsSlice.ts
  const contentId = windowId.split('#')[1];
  const windowContent = displayWindowContent(contentId, {
    windowId: currentNode,
    language,
    src,
    type,
    windowActions,
    children,
  });

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
        handleWindowUpdate={(data) => windowActions?.updateWindowState(data)}
        nodeType={type}
        dataInitialDimension='{"width": "1000px", "height": "600px"}'
        fileClassName="files-explorer"
      />
    )
  );
};

export default WindowContent;
