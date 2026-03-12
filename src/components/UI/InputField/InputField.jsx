import styles from './InputField.module.scss';
import exclamation from './../../../images/exclamation.svg';

export const InputField = ({
  label,
  placeholder,
  type = 'text',
  error,
  autoComplete,
  register,
  name,
  validation,
  onClick,
  icon,
  visibleIcon,
  icon1,
  icon2,
}) => {
  return (
    <div className={styles.wrapper}>
      <label>
        {label && <h3 className={styles.label}>{label}</h3>}
        <div className={styles.group}>
          <input
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...register(name, validation)}
          />
          {icon && (
            <button className={styles.btnEye} onClick={(e) => onClick(e)}>
              {visibleIcon ?  icon1  :  icon2 }
            </button>
          )}
        </div>

        {error && (
          <div className={styles.exclamation}>
            <img src={exclamation} alt="Знак" />
            <p>{error}</p>
          </div>
        )}
      </label>
    </div>
  );
};
