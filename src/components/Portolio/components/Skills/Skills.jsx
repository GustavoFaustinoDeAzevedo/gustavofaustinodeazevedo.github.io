import './skillStyles.css';
import skillsContent from './SkillsContent';

const Skills = ({ language }) => {
  const selected = skillsContent[language];
  return (
    <ul
      data-initial-dimension='{"width": "740px", "height": "540px"}'
      aria-label="Skills List"
      className="skills-list-wrapper"
    >
      {Object.entries(selected).map(([key, { title, items }]) => (
        <li key={key}>
          <h3>
            <strong>{title}</strong>
          </h3>
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
  );
};

export default Skills;
