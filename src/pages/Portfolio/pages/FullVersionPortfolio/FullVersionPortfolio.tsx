import Carousel from '@/components/Carousel';
import { AboutMe, ContactCard, MySkills, SendMessage } from '../../components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const FullVersionPortfolio = () => {
  const language = useSelector((state: RootState) => state.settings.language);
  const aboutMeStyles = {
    container: {
      width: '100vw',
      height: '100vh',
      padding: '0rem',
      position: 'relative',
      overflow: 'hidden',
    },
    wrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      padding: '10rem',
      gap: '0rem',
    },
    image: {
      // display: 'none',
      // position: 'absolute',
      // bottom: '5',
      // right: '10%',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'fit-content',
      borderRadius: '0',
      border: 'none',
      objectFit: 'cover',
      filter:
        'grayscale(30%) brightness(1.2) drop-shadow(0 0 10px rgba(0,150,255,0.3))',
      WebkitMaskImage:
        'linear-gradient(to bottom, #000000 80%, #00000000 100%)',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskSize: 'cover',
      maskImage: 'linear-gradient(to bottom, #000000 80%, #00000000 100%)',
      maskRepeat: 'no-repeat',
      maskSize: 'cover',
      transition: 'none',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      justifyContent: 'center',
      textAlign: 'center',
    },
    titleContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '2.5rem',
      color: '#00d4ff',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    horizontalRule: {
      justifySelf: 'center',
      width: '50%',
      height: '2px',
      marginBottom: '1rem',
    },
    text: {
      textAlign: 'justify',
      lineHeight: '1.8',
    },
  };
  return (
    <>
      <div className="portfolio-background"></div>
      <div className="portfolio-container">
        <header className="portfolio-header">
          <h1 className="portfolio-header__logo">
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
        <main className="portfolio-main">
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
        </main>
        <footer className="portfolio-footer"></footer>
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

export default FullVersionPortfolio;
