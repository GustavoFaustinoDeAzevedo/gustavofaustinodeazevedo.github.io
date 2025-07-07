import FilesExplorer from '../../FilesExplorer';

import getWindowContent from '../utils/getWindowContent';

const WindowContent = ({
  id,
  nodeId,
  src,
  children,
  windowActions,
  type,
  language,
  windowList,
  filesActions,
}) => {
  const contentId = id.split('#')[1];
  const windowContent = getWindowContent(contentId, {
    id,
    language,
    src,
    type,
    windowActions,
  });

  return (
    windowContent || (
      <FilesExplorer.FilesList
        nodeId={nodeId}
        language={language}
        windowList={windowList}
        children={children}
        filesActions={filesActions}
        windowActions={windowActions}
        handleWindowUpdate={(data) =>
          windowActions?.handleUpdateWindow({ id, ...data })
        }
        nodeType={type}
        dataInitialDimension='{"width": "1000px", "height": "600px"}'
        fileClassName="files-explorer"
      />
    )
  );
};

export default WindowContent;
