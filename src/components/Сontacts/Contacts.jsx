import styles from './Contacts.module.scss';

import { ROUTES } from '../../const';
import Button from '../UI/Button/Button';

const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <h1 className={styles.title}>КОНТАКТЫ</h1>
      <h2 className={styles.subtitle}>Наши социальные сети:</h2>
      <div className={styles.wrapper}>
        <p className={styles.text}>Свяжитесь с нами любым удобным способом!</p>
        <Button to={ROUTES.WHATSAPP} styleColor={styles.buttonColorGreen}>
          WhatsApp
        </Button>
        <Button to={ROUTES.VIBER} styleColor={styles.buttonColorPurple}>
          Viber
        </Button>
        <Button to={ROUTES.TELEGRAM} styleColor={styles.buttonColorBlues}>
          Telegram
        </Button>
        <Button to={ROUTES.VK} styleColor={styles.buttonColorBlue}>
          VK
        </Button>
      </div>
    </div>
  );
};

export default Contacts;
