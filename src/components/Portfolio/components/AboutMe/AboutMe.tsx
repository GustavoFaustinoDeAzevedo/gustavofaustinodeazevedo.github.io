import { useSelector } from 'react-redux';
import aboutMeData, { AboutMeData } from './aboutMe.data';
import { RootState } from '@/store';

interface AboutMeProps {
  classContainer?: string;
  classWrapper?: string;
  classImage?: string;
  classTitleContainer?: string;
  classTitle?: string;
  classSubtitle?: string;
  classHorizontalRule?: string;
  classText?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
}

const AboutMe = (props: AboutMeProps) => {
  const language = useSelector((state: RootState) => state.settings.language);
  return (
    <main
      className={props.classContainer || 'about-me'}
      aria-label="About Me Section"
      data-initial-dimension='{"width": "500px", "height": "550px"}'
    >
      <div className={props.classWrapper || 'about-me__wrapper'}>
        <img
          src={props.image || 'images/profile-pic.png'}
          alt={props.imageAlt || aboutMeData[language].imageAlt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          className={props.classImage || 'about-me__image'}
        />

        <section
          className={props.classTitleContainer || 'about-me__title-container'}
        >
          <h2 className={props.classTitle || 'about-me__title'}>
            {props.title || aboutMeData[language].title}
          </h2>
          <h3 className={props.classSubtitle || 'about-me__subtitle'}>
            {aboutMeData[language].subtitle}
          </h3>
          <hr
            className={props.classHorizontalRule || 'about-me__horizontal-rule'}
          />
        </section>
        <p className={props.classText || 'about-me__text'}>
          {props.text || aboutMeData[language].text}
        </p>
      </div>
    </main>
  );
};

export default AboutMe;
