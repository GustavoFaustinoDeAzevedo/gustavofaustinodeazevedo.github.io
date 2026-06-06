import { useSelector } from 'react-redux';
import aboutMeData, { AboutMeData } from './aboutMe.data';
import { RootState } from '@/store';

type StyleSlots =
  | 'container'
  | 'wrapper'
  | 'image'
  | 'text'
  | 'titleContainer'
  | 'title'
  | 'horizontalRule'
  | 'subtitle'
  | 'textContainer';

type AboutMeStyles = Partial<Record<StyleSlots, React.CSSProperties>>;

interface AboutMeProps {
  styles?: AboutMeStyles;

  text?: React.ReactNode;
  image?: string;
  imageAlt?: string;

  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

const AboutMe = (props: AboutMeProps) => {
  const language = useSelector((state: RootState) => state.settings.language);
  const { styles, text, image, imageAlt, title, subtitle } = props;
  return (
    <main
      className={'about-me'}
      style={styles?.container}
      aria-label="About Me Section"
    >
      <div className={'about-me__wrapper'} style={styles?.wrapper}>
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
          style={styles?.image}
        />
        <div
          className={
            (!styles?.textContainer && 'about-me__text-container') || ''
          }
          style={styles?.textContainer}
        >
          <div
            className={
              (!styles?.titleContainer && 'about-me__title-container') || ''
            }
            style={styles?.titleContainer}
          >
            <h2
              className={(!styles?.title && 'about-me__title') || ''}
              style={styles?.title}
            >
              {props.title || aboutMeData[language].title}
            </h2>
            <h3
              className={(!styles?.subtitle && 'about-me__subtitle') || ''}
              style={styles?.subtitle}
            >
              {props.subtitle || aboutMeData[language].subtitle}
            </h3>
            <hr
              className={
                (!styles?.horizontalRule && 'about-me__horizontal-rule') || ''
              }
              style={styles?.horizontalRule}
            />
          </div>
          <p
            className={(!styles?.text && 'about-me__text') || ''}
            style={styles?.text}
          >
            {props.text || aboutMeData[language].text}
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutMe;
