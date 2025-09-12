import Button from '@/components/ui/Button';
import AnimatedInput from '@/components/Window/components/AnimatedInput';

const ContactSection = ({ language }) => (
  <form
    className="contact-form"
    aria-label="Contact Form"
    action="https://formspree.io/f/mnqelzyz"
    method="POST"
    target="placeholder"
    data-initial-dimension='{"width": "490px", "height": "550px"}'
  >
    <p>
      {language === 'eng'
        ? 'Use the form below to contact me'
        : 'Use o formulário abaixo para entrar em contato comigo'}
    </p>
    <AnimatedInput
      id="name"
      type="input"
      name="Name"
      required
      ariaLabel="Name input"
      inputPlaceholder="Ex: Charlie Lima"
    >
      Name
    </AnimatedInput>
    <AnimatedInput
      id="email"
      type="email"
      name="message"
      required
      ariaLabel="Email input"
      inputPlaceholder="example@email.com"
    >
      Email
    </AnimatedInput>
    <AnimatedInput
      id="message"
      type="text"
      name="message"
      required
      ariaLabel="Message input"
      inputPlaceholder="Your text here..."
      textArea
    >
      Message
    </AnimatedInput>
    <Button type="submit" ariaLabel="Submit Button" variant={'primary'}>
      Send Message
    </Button>
  </form>
);

export default ContactSection;
