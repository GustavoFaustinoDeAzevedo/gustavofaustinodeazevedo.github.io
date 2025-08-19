import {
  Choice,
  Choices,
  HandleChangeBackground,
} from '../types/changeBackground.data.types';
import { BackgroundDisplay } from '../types/changeBackground.types';

type RadioMapperProps = {
  radioObjectData: Choices;
  backgroundDisplay: BackgroundDisplay;
  handleChangeBackgroundDisplay: () => void;
};

const RadioMapper = ({
  radioObjectData,
  backgroundDisplay,
  handleChangeBackgroundDisplay,
}: RadioMapperProps) => {
  return (
    <>
      {Object.values(radioObjectData).map((object: Choice) => (
        <div className="change-background__display-option" key={object.id}>
          <label htmlFor={object.id}>{object.label}</label>
          <input
            type="radio"
            id={object.id}
            name="btype"
            value={object.id}
            checked={backgroundDisplay === object.id}
            onChange={handleChangeBackgroundDisplay}
          />
        </div>
      ))}
    </>
  );
};
