interface AboutMeContent {
  por: {
    title: string;
    subtitle: string;
    text: string;
  };
  eng: {
    title: string;
    subtitle: string;
    text: string;
  };
}

const aboutMeContent: AboutMeContent = {
  por: {
    title: 'Olá, eu sou o Gustavo!',
    subtitle: 'Desenvolvedor Web React/JS | Especialista em HTML/CSS.',
    text: 'Graduado em Engenharia da Computação, sou apaixonado por criar interfaces intuitivas e visualmente marcantes com HTML, CSS e React — especialmente em temas escuros. Estou em busca de oportunidades como desenvolvedor front-end para crescer profissionalmente e colaborar em projetos que entreguem experiências eficientes e bem planejadas aos usuários.',
  },
  eng: {
    title: "Hello, I'm Gustavo!",
    subtitle: 'React/JS Web Developer | HTML/CSS expertise.',
    text: "I hold a degree in Computer Engineering and have a passion for crafting intuitive and visually striking interfaces using HTML, CSS, and React — especially with dark themes. I'm seeking opportunities as a front-end developer to grow professionally and contribute to projects that deliver efficient and well-designed user experiences.",
  },
};

export default aboutMeContent;
