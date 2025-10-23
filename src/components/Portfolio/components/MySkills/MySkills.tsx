import skillsContent, { Skills } from './MySkills.data';

const MySkills = ({ language }: { language: string }) => {
  const selected = skillsContent?.[
    language as keyof typeof skillsContent
  ] as Skills;
  return (
    <div className="skills-list">
      <div className="skills-list__container">
        <ul
          aria-label="Skills List"
          className="skills-list__wrapper"
        >
          {Object.entries(selected).map(([key, { title, items }]) => (
            <li key={key}>
              <h3 className="skills-list__title">{title}</h3>
              <ul
                className="skills-list__skills"
                aria-label={`${title} Skills`}
              >
                {items.map((skill: string) => (
                  <li
                    className="skills-list__skill"
                    key={skill}
                    aria-label={skill}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MySkills;
