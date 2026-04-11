import Carousel from '@/components/DesktopEnvironment/UIControls/Data&Collections';
import {
  AboutMe,
  ContactCard,
  MySkills,
  SendMessage,
} from '@/components/Portfolio';
import { RootState } from '@/store';
import { filter } from 'mathjs';
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
      alignItems: 'start',
      justifyContent: 'center',
      padding: '2rem 5rem 15rem 10rem',
    },
    stylesImage: {
      position: 'absolute',
      bottom: '20%',
      right: '10%',
      maxWidth: '100%',
      maxHeight: '100%',
      width: '40rem',
      borderRadius: '0',
      border: 'none',
      objectFit: 'cover',
      marginBottom: '0rem',
      filter:
        'grayscale(30%) brightness(1.2) drop-shadow(0 0 10px rgba(0,150,255,0.3))',
      WebkitMaskImage: 'linear-gradient(to bottom, #000000, #00000000)',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskSize: 'cover',
      maskImage: 'linear-gradient(to bottom, #000000, #00000000)',
      maskRepeat: 'no-repeat',
      maskSize: 'cover',
    },
    stylesTitleContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    stylesTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
    },
    stylesSubtitle: {
      fontSize: '2.5rem',
      color: '#00d4ff',
      fontWeight: 600,
      marginBottom: '1rem',
      textAlign: 'left',
    },
    stylesText: {
      width: '50%',
      textAlign: 'justify',
    },
    stylesHorizontalRule: {
      width: '70%',
      height: '2px',
      marginBottom: '1rem',
    },
  };
  return (
    <>
      <div className="portfolio-background"></div>
      <div className="portfolio-container">
        <header className="portfolio-header">
          <h1 className="portfolio-header__text">
            Gustavo Faustino de Azevedo
          </h1>
          <nav className="portfolio-header__nav">
            <a href="#aboutMe">
              {language === 'por' ? 'Sobre mim' : 'About me'}
            </a>
            <a href="#mySkills">
              {language === 'por' ? 'Minhas habilidades' : 'My skills'}
            </a>
            <a href="#contact" className="portfolio-header__contact">
              {language === 'por' ? 'Entre em Contato' : 'Contact Me'}
            </a>
          </nav>
        </header>
        <Carousel
          carouselWrapperStyles={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollSnapType: 'y mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            willChange: 'scroll-position',
          }}
          carouselItemStyles={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
            scrollSnapAlign: 'start',
            flex: '0 0 100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <section id="aboutMe" className="portfolio-main__item">
            <AboutMe
              styles={aboutMeStyles}
              image="images/profile-pic-2.png"
              title={
                language === 'por'
                  ? 'Desenvolvedor Web React/TS'
                  : 'Web Developer React/TS'
              }
              subtitle={
                language === 'por'
                  ? 'Especialista em HTML/CSS.'
                  : 'HTML/CSS Expert.'
              }
            />
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
        </Carousel>
        {/* <main className="portfolio-main">
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
      </main> */}
      </div>
    </>
  );
};

export default ScriptPortfolio;
