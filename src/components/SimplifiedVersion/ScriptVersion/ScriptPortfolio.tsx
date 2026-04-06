import {
  AboutMe,
  ContactCard,
  MySkills,
  SendMessage,
} from '@/components/Portfolio';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const ScriptPortfolio = () => {
  const language = useSelector((state: RootState) => state.settings.language);
  const aboutMeStyles = {
    stylesContainer: {
      width: '100vw',
      height: '100vh',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    },
    stylesWrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stylesImage: {
      maxWidth: '40rem',
      maxHeight: '40rem',
      borderRadius: '50%',
      border: 'none',
      objectFit: 'cover',
      marginBottom: '0rem',
    },
    stylesTitleContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    stylesTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    stylesSubtitle: { fontSize: '1rem', marginBottom: '1rem' },
    stylesText: {},
    stylesHorizontalRule: {
      width: '100%',
      height: '2px',
      marginBottom: '1rem',
    },
  };
  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1 className="portfolio-header__text">
          {language === 'por'
            ? 'Bem vindo ao meu Portfólio'
            : 'Welcome to my Portfolio'}
        </h1>
        <nav className='portfolio-header__nav' >
          <a href="#aboutMe">{language === 'por' ? 'Sobre mim' : 'About me'}</a>
          <a href="#mySkills">
            {language === 'por' ? 'Minhas habilidades' : 'My skills'}
          </a>
          <a href="#contact">{language === 'por' ? 'Contato' : 'Contact'}</a>
        </nav>
      </header>
      <main className="portfolio-main">
        <section id="aboutMe" className="portfolio-main__item">
          <AboutMe styles={aboutMeStyles} image="images/profile-pic-2.png" />
        </section>
        <section
          id="mySkills"
          className="portfolio-main__item portfolio-main__skills"
        >
          <MySkills />
        </section>
        <section
          id="contact"
          className="portfolio-main__item portfolio-main__contact"
        >
          <SendMessage />
          <ContactCard />
        </section>
      </main>
    </div>
  );
};

export default ScriptPortfolio;
