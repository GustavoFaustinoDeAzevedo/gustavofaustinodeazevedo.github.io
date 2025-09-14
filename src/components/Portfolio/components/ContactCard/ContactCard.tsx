import Icon from '@/components/ui/GlobalStyles/components/Icon';
import { QRCodeCanvas } from 'qrcode.react';

const ContactCard = ({ language }: { language: string }) => {
  return (
    <section className="contact-card">
      <h2 className="contact-card__title">
        {language === 'eng'
          ? 'Contact information and social networks'
          : 'Informações de contato e redes sociais'}
      </h2>

      <hr />
      <ul>
        <li>
          <a
            href="mailto:gustavofaustino18@hotmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon variant="email" />
            gustavofaustino18@hotmail.com
          </a>
        </li>
        <li>
          <a
            href="tel:+5584992057810"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon variant="phone" />
            (84) 99205-7810
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/5584992057810"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon variant="whatsapp" />
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/gustavo-faustino-de-azevedo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon variant="linkedin" />
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/GustavoFaustinoDeAzevedo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon variant="github" />
            GitHub
          </a>
        </li>
      </ul>
    </section>
  );
};

export default ContactCard;
