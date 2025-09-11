import aboutMeContent from './aboutMeContent';

export type AboutMeContent = keyof typeof aboutMeContent;

interface AboutMeProps {
  language: AboutMeContent;
}

const AboutMe: React.FC<AboutMeProps> = ({ language }) => (
  <main
    className="about-me"
    aria-label="About Me Section"
    data-initial-dimension='{"width": "500px", "height": "550px"}'
  >
    <div className="about-me-wrapper">
      <section className="about-me-image">
        <img
          src="images/profile-pic.png"
          alt="A profile picture of Gustavo Faustino de Azevedo"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
      </section>
      <section className="about-me-title">
        <h2>{aboutMeContent[language].title}</h2>
        <h3>{aboutMeContent[language].subtitle}</h3>
        <hr />
      </section>
      <section className="about-me-text">
        <p>{aboutMeContent[language].text}</p>
      </section>
    </div>
  </main>
);

export default AboutMe;
