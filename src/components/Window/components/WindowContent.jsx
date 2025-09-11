import { FilesList } from '../../FilesExplorer';

import getWindowContent from '../utils/getWindowContent';

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
  const windowContent = getWindowContent(contentId, {
    windowId: currentNode,
    language,
    src,
    type,
    windowActions,
    children,
  });

  return (
    windowContent || (
      <FilesList
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
