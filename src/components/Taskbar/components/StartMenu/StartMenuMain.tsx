import { ListFiles } from '@components/FilesExplorer';
import { StylesConfig } from '@components/FilesExplorer/components/SystemFile/StyledFileWrapper/fileWrapperStyle';
import Icon from '@components/ui/GlobalStyles/components/Icon';
import { FileNode } from '@/store/slices/file';
import { WindowData } from '@/store/actions/useWindowActions';
import { Language } from '@/store/slices/settings';
import { Title } from '@/store/slices/window';
import { useMemo } from 'react';

const StartMenuMain = ({
  language,
  installedApps,
  history,
  handleToggleVisibility,
  handleOpenHistoryApp,
  searchAppValue,
  fileWrapperStyle,
}: {
  language: Language;
  installedApps: FileNode[];
  history: Title[];
  handleToggleVisibility: () => void;
  handleOpenHistoryApp: (appProps: WindowData) => void;
  searchAppValue: string;
  fileWrapperStyle: StylesConfig;
}) => {
  //TODO  organizar o código
  const stylesConfig = useMemo(() => ({ ...fileWrapperStyle, gap: '2px' }), []);
  let dotCount = 0;
  const installedAppsFieldset = useMemo(
    () => (
      <fieldset className="start-menu__fieldset">
        <legend className="text-xs text-bold">
          {language !== 'por' ? 'Apps' : 'Aplicativos'}
        </legend>
        <ul className="carousel">
          {installedApps.map((_, index: number) => {
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
    ),
    [
      language,
      installedApps,
      handleToggleVisibility,
      searchAppValue,
      stylesConfig,
    ],
  );

  const appHistoryFieldset = useMemo(
    () => (
      <fieldset className="start-menu__fieldset margin-bottom-4">
        <legend className="text-xs text-bold">
          {language !== 'por' ? 'History' : 'Histórico'}
        </legend>
        <ul className="start-menu__list ">
          {history?.map((value: Title, index: number) => {
            const key = value[language as keyof typeof value] || String(index);
            return (
              <li
                className="start-menu__list-item"
                key={key as string}
                onClick={() =>
                  handleOpenHistoryApp(value.reopenProps as WindowData)
                }
              >
                <Icon
                  className="start-menu__list-item-icon"
                  variant={value.icon}
                />
                <p>{value[language as keyof typeof value] as string}</p>
              </li>
            );
          })}
        </ul>
      </fieldset>
    ),
    [language, history, handleOpenHistoryApp],
  );

  return (
    <main className="flex flex-column gap-2">
      {installedAppsFieldset}
      {appHistoryFieldset}
    </main>
  );
};

export default StartMenuMain;
