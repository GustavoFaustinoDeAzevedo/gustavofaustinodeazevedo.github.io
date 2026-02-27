import { ListFiles } from '@/components/DesktopEnvironment/NativeApplications/FilesExplorer';
import { StylesConfig } from '@/components/DesktopEnvironment/NativeApplications/FilesExplorer/components/SystemFile/StyledFileWrapper/fileWrapperStyle';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const InstalledAppsFieldset = ({
  searchAppValue,
  handleToggleVisibility,
}: {
  searchAppValue: string;
  handleToggleVisibility: () => void;
}) => {
  const language = useSelector((state: RootState) => state?.settings.language);
  const { installedApps } = useSelector((state: RootState) => state.file);
  const stylesConfig: StylesConfig = {
    $direction: 'horizontal',
    $size: '',
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
  let dotCount = 0;
  const installedAppsFieldset = (
    <fieldset className="start-menu__fieldset">
      <legend className="text-xs text-bold">
        {language !== 'por' ? 'Apps' : 'Aplicativos'}
      </legend>
      <ul className="carousel">
        {installedApps?.map((_, index: number) => {
          const key = crypto.randomUUID();
          if (index % 4 === 0) {
            dotCount += 1;
            return (
              <li className="carousel-item" key={key}>
                <ListFiles
                  handleGlobalClick={handleToggleVisibility}
                  currentNode={''}
                  className={'start-menu__list'}
                  openMode={'window'}
                  content={installedApps.slice(index, index + 4)}
                  doubleClickToOpen={false}
                  stylesConfig={stylesConfig}
                  filters={searchAppValue}
                />
              </li>
            );
          }
        })}
      </ul>
      <div className="dots">
        {Array.from({ length: dotCount }).map(() => {
          const key = crypto.randomUUID();
          return <span key={key} className="dot"></span>;
        })}
      </div>
    </fieldset>
  );

  return installedAppsFieldset;
};

export default InstalledAppsFieldset;
