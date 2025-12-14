import aboutMeData, { AboutMeData } from './aboutMe.data';

const AboutMe = ({ language }: { language: keyof AboutMeData }) => (
  <main
    className="about-me"
    aria-label="About Me Section"
    data-initial-dimension='{"width": "500px", "height": "550px"}'
  >
    <div className="about-me__wrapper">
      <img
        src="images/profile-pic.png"
        alt="A profile picture of Gustavo Faustino de Azevedo"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        fetchPriority="high"
        className="about-me__image"
      />

      <section className="about-me__title">
        <h2>{aboutMeData[language].title}</h2>
        <h3>{aboutMeData[language].subtitle}</h3>
        <hr />
      </section>
      <p className="about-me__text">{aboutMeData[language].text}</p>
    </div>
  </main>
);

export default AboutMe;
