import { ListFiles } from '@components/FilesExplorer';

// import displayWindowContent from '../utils/displayWindowContent';

import { returnWindowContent } from '@/store/slices/window/windowSlice.data';
import { FileNode } from '@/store/slices/file';

/** O windowId tem o formato: window#contentId#[randomString] para que cada janela possa ser uma janela única.
 * O contentId representa a ID do conteúdo da janela que será renderizado.
 * O randomString representa uma string aleatória que é criada de acordo com a data, hora e minuto atual usada para identificar a janela.
 * O calculo pode ser encontrado em file:scr/store/settings/settingsSlice.ts
 */

const WindowContent = ({
  windowId,
  currentNode,
  src,
  content,
  type,
}: {
  windowId: string;
  currentNode: string;
  src?: string;
  content?: FileNode[];
  type?: string;
}) => {
  const contentId = windowId.split('#')[1];
  const windowContent = returnWindowContent(contentId, {
    windowId: currentNode,
    src,
    type,
    content,
  });

  return (
    windowContent || (
      <ListFiles
        currentNode={currentNode}
        content={content}
        nodeType={type}
        openMode={'window'}
        doubleClickToOpen={true}
      />
    )
  );
};

export default WindowContent;
