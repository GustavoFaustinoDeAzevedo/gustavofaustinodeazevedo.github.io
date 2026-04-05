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
  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1 className="portfolio-header__text">
          {language === 'por'
            ? 'Bem vindo à versão simplificada do  meu Portfólio'
            : 'Welcome to the simplified version of my Portfolio'}
        </h1>
        <nav>
          <a href="#aboutMe">{language === 'por' ? 'Sobre mim' : 'About me'}</a>
        </nav>
      </header>
      <main className="portfolio-main">
        <AboutMe
          classContainer="classContainer portfolio-main__item"
          classWrapper="classWrapper"
          classImage="classImage"
          classTitleContainer="classTitleContainer"
          classTitle=""
          classSubtitle=""
          classText=""
          classHorizontalRule="classHorizontalRule"
        />
        <div className="portfolio-main__item">
          <MySkills />
        </div>
        <div className="portfolio-main__item">
          <section id="aboutMe">
            <SendMessage />
          </section>
          <ContactCard />
        </div>
      </main>
    </div>
  );
};

export default ScriptPortfolio;
