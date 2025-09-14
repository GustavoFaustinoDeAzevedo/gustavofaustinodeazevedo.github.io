import skillsContent, { Skills } from './MySkills.data';

const MySkills = ({ language }: { language: string }) => {
  const selected = skillsContent?.[
    language as keyof typeof skillsContent
  ] as Skills;
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
              {items.map((skill: string) => (
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

export default MySkills;
