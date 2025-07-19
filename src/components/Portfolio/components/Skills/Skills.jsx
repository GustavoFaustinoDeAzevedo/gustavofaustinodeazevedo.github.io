import './skillStyles.css';
import skillsContent from './SkillsContent';

const Skills = ({ language }) => {
  const selected = skillsContent[language];
  return (
    <div className="skills-list-container">
      <ul
        data-initial-dimension='{"width": "750px", "height": "540px"}'
        aria-label="Skills List"
        className="skills-list-wrapper"
      >
        {Object.entries(selected).map(([key, { title, items }]) => (
          <li key={key}>
            <h3 className="skills-title">{title}</h3>
            <ul className="skills-list" aria-label={`${title} Skills`}>
              {items.map((skill) => (
                <li className="skill" key={skill} aria-label={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
