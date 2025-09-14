import Button from '@/components/ui/Button';
import AnimatedInput from '@/components/Window/components/AnimatedInput';

const SendMessage = ({ language }) => (
  <form
    className="contact-form"
    aria-label={language === 'eng' ? 'Contact form' : 'Formulário de contato'}
    action="https://formspree.io/f/mnqelzyz"
    method="POST"
    target="placeholder"
  >
    <h2 className="txt-weight-600 txt-center margin-bottom-1">
      {language === 'eng'
        ? 'Use the form below to contact me'
        : 'Use o formulário abaixo para entrar em contato comigo'}
    </h2>
    <AnimatedInput
      id="name"
      type="input"
      name="Name"
      required
      ariaLabel={language === 'eng' ? 'Name input' : 'Inserir Nome'}
      inputPlaceholder="Ex: Charlie Lima"
    >
      {language === 'eng' ? 'Name' : 'Nome'}
    </AnimatedInput>
    <AnimatedInput
      id="email"
      type="email"
      name="message"
      required
      ariaLabel={language === 'eng' ? 'Email input' : 'Inserir Email'}
      inputPlaceholder={
        language === 'eng'
          ? 'Ex: charlielima@example.com'
          : 'Ex: charlielima@examplo.com'
      }
    >
      Email
    </AnimatedInput>
    <AnimatedInput
      id="message"
      type="text"
      name="message"
      required
      ariaLabel={language === 'eng' ? 'Message input' : 'Inserir Mensagem'}
      inputPlaceholder={
        language === 'eng'
          ? 'Ex: I would like to work with you'
          : 'Ex: Eu gostaria de trabalhar com você'
      }
      textArea
    >
      {language === 'eng' ? 'Message' : 'Mensagem'}
    </AnimatedInput>
    <Button type="submit" ariaLabel="Submit Button" variant={'primary'}>
      {language === 'eng' ? 'Submit' : 'Enviar'}
    </Button>
  </form>
);

export default SendMessage;
