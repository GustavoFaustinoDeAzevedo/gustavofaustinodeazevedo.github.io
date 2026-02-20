import { HistoryFieldset, InstalledAppsFieldset } from '.';

const StartMenuMain = ({
  handleToggleVisibility,
  searchAppValue,
}: {
  handleToggleVisibility: () => void;
  searchAppValue: string;
}) => {
  return (
    <main className="flex flex-column gap-2">
      <InstalledAppsFieldset
        searchAppValue={searchAppValue}
        handleToggleVisibility={handleToggleVisibility}
      />
      <HistoryFieldset />
    </main>
  );
};

export default StartMenuMain;
