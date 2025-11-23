import Icon from "@/components/ui/GlobalStyles/components/Icon";

const StartMenuFooter = () => {
  return (
    <footer className="start-menu__footer">
      <button
        title="Placeholder"
        aria-label="Placeholder"
        type="button"
        className="start-menu__footer-button"
      >
        <Icon
          className="start-menu__footer-button-icon"
          customPicture="/icons/about-me-icon.png"
        ></Icon>
        <p className="text-color-light text-xs">Placeholder</p>
      </button>
      <button
        title="config"
        aria-label="config"
        type="button"
        className="start-menu__footer-button"
      >
        Placeholder
      </button>
    </footer>
  );
};

export default StartMenuFooter;
