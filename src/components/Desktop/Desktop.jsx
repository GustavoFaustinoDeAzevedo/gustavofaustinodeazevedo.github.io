import FilesExplorer from '../FilesExplorer';

const Desktop = ({ onContextMenu, ...props }) => {
  return (
    <div className="background">
      <FilesExplorer.FilesList
        fileClassName={'desktop-files-wrapper related-background'}
        {...props}
      />
    </div>
  );
};

export default Desktop;
