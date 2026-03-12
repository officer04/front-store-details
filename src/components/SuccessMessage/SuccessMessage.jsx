import Button from '../UI/Button/Button';
import styles from './SuccessMessage.module.scss'

const SuccessMessage = ({ email, onClose }) => (
  <div className={styles.card}>
    <p>Информация по восстановлению пароля отправлена на email: {email}</p>
    <Button
      onClick={onClose}
      className={styles.button}
      variant='outline'
    >
      Понятно
    </Button>
  </div>
);

export default SuccessMessage;