export interface AboutMeData {
  por: {
    imageAlt: string;
    title: string;
    subtitle: React.ReactNode;
    text: string;
  };
  eng: {
    imageAlt: string;
    title: string;
    subtitle: React.ReactNode;
    text: string;
  };
}

const aboutMeData: AboutMeData = {
  por: {
    imageAlt: 'Foto de perfil de Gustavo Faustino de Azevedo',
    title: 'Gustavo Faustino de Azevêdo',
    subtitle: (
      <>
        Desenvolvedor Web React/TS <br key="br" />
        <strong>Especialista em HTML/CSS.</strong>
      </>
    ),
    text: 'Graduado em Engenharia da Computação, sou apaixonado por criar interfaces intuitivas e visualmente marcantes com HTML, CSS e React. Estou em busca de oportunidades como desenvolvedor front-end para crescer profissionalmente e colaborar em projetos que entreguem experiências eficientes e bem planejadas aos usuários.',
  },
  eng: {
    imageAlt: 'A profile picture of Gustavo Faustino de Azevedo',
    title: 'Gustavo Faustino de Azevêdo',
    subtitle: (
      <>
        Web Developer React/TS <br key="br" /> HTML/CSS Expert.
      </>
    ),
    text: "I hold a degree in Computer Engineering and have a passion for crafting intuitive and visually striking interfaces using HTML, CSS, and React. I'm seeking opportunities as a front-end developer to grow professionally and contribute to projects that deliver efficient and well-designed user experiences.",
  },
};

export default aboutMeData;
