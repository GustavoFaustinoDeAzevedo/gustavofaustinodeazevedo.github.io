import { useSelector } from 'react-redux';
import aboutMeData, { AboutMeData } from './aboutMe.data';
import { RootState } from '@/store';

interface AboutMeStyles {
  stylesContainer?: Record<string, number | string>;
  stylesWrapper?: Record<string, number | string>;
  stylesImage?: Record<string, number | string>;
  stylesText?: Record<string, number | string>;
  stylesTitleContainer?: Record<string, number | string>;
  stylesTitle?: Record<string, number | string>;
  stylesHorizontalRule?: Record<string, number | string>;
  stylesSubtitle?: Record<string, number | string>;
}

interface AboutMeProps {
  styles?: AboutMeStyles;
  text?: string;
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
}

const AboutMe = (props: AboutMeProps) => {
  const language = useSelector((state: RootState) => state.settings.language);
  const { styles, text, image, imageAlt, title, subtitle } = props;
  return (
    <main
      className={'about-me'}
      style={styles?.stylesContainer}
      aria-label="About Me Section"
      data-initial-dimension='{"width": "500px", "height": "550px"}'
    >
      <div className={'about-me__wrapper'} style={styles?.stylesWrapper}>
        <img
          src={props.image || 'images/profile-pic.png'}
          alt={
            props.image ? props.imageAlt || '' : aboutMeData[language].imageAlt
          }
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          className={'about-me__image'}
          style={styles?.stylesImage}
        />

        <section
          className={
            (!styles?.stylesTitleContainer && 'about-me__title-container') || ''
          }
          style={styles?.stylesTitleContainer}
        >
          <h2
            className={(!styles?.stylesTitle && 'about-me__title') || ''}
            style={styles?.stylesTitle}
          >
            {props.title || aboutMeData[language].title}
          </h2>
          <h3
            className={(!styles?.stylesSubtitle && 'about-me__subtitle') || ''}
            style={styles?.stylesSubtitle}
          >
            {aboutMeData[language].subtitle}
          </h3>
          <hr
            className={
              (!styles?.stylesHorizontalRule && 'about-me__horizontal-rule') ||
              ''
            }
            style={styles?.stylesHorizontalRule}
          />
        </section>
        <p
          className={(!styles?.stylesText && 'about-me__text') || ''}
          style={styles?.stylesText}
        >
          {props.text || aboutMeData[language].text}
        </p>
      </div>
    </main>
  );
};

export default AboutMe;
