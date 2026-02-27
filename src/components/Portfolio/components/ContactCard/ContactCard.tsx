import Icon from '@/components/DesktopEnvironment/UIControls/GlobalStyles/components/Icon';
import { leftSideCardLanguage, contactCard } from './ContactCard.data';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ContactCard = () => {
  const language = useSelector((state: RootState) => state.settings.language);
  const key = crypto.randomUUID();

  return (
    <div className="contact-card__container">
      <section className="contact-card">
        <div className="contact-card__wrapper-left">
          <h2 className="contact-card__title">
            {leftSideCardLanguage[language]?.cardTitle}
          </h2>

          <div className="contact-card__profile">
            <p className="contact-card__profile-name">
              Gustavo Faustino de Azevêdo
            </p>
            <address className="contact-card__profile-address">
              Parnamirim, RN - {leftSideCardLanguage[language]?.country}
            </address>
          </div>
          <hr />
        </div>
        <div className="contact-card__wrapper-right">
          <ul className="contact-card__list">
            {contactCard.map(({ icon, text, href }, index) => (
              <li
                className="contact-card__list-item"
                key={`${key}-${text}-${index}`}
                aria-label={text}
                title={text}
              >
                <a
                  className="contact-card__item-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="contact-card__link-icon" variant={icon} />
                  <address className="contact-card__link-text">{text}</address>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactCard;
