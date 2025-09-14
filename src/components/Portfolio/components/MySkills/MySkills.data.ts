export interface Skills {
  technical: {
    title: string;
    items: string[];
  };
  soft: {
    title: string;
    items: string[];
  };
}

export interface MySkillsData {
  por: Skills;
  eng: Skills;
}

const mySkillsData: MySkillsData = {
  por: {
    technical: {
      title: 'Habilidades Técnicas',
      items: [
        'HTML5 & CSS3',
        'JavaScript',
        'React.js',
        'Design Responsivo',
        'Desempenho de Páginas Web',
        'Git & GitHub',
        'Português Fluente',
        'Inglês Avançado',
      ],
    },
    soft: {
      title: 'Habilidades Interpessoais',
      items: [
        'Pensamento crítico e resolução de problemas',
        'Comunicação eficaz',
        'Colaboração e trabalho em equipe',
        'Adaptabilidade e Aprendizado Contínuo',
        'Proatividade',
        'Empatia e Inteligência Emocional',
      ],
    },
  },
  eng: {
    technical: {
      title: 'Technical Skills',
      items: [
        'HTML5 & CSS3',
        'JavaScript',
        'React.js',
        'Responsive Design',
        'Web Performance',
        'Git & GitHub',
        'Fluent Portuguese',
        'Advanced English',
      ],
    },
    soft: {
      title: 'Soft Skills',
      items: [
        'Critical Thinking and Problem Solving',
        'Effective Communication',
        'Collaboration and Teamwork',
        'Adaptability and Continuous Learning',
        'Proactivity',
        'Empathy and Emotional Intelligence',
      ],
    },
  },
};

export default mySkillsData;
