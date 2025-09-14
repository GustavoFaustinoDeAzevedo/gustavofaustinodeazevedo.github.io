import { QRCodeCanvas } from 'qrcode.react';

const ContactCard = ({ language }: { language: string }) => {
  return (
    <div className="contact-card">
      <QRCodeCanvas
        value="https://gustavofaustinodezevedo.github.io"
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
};

export default ContactCard;
