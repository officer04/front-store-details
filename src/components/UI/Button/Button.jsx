import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className,
  leftIcon,
  rightIcon,
  styleColor, 
  styleWidth,
  to,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={`${styles.button} ${styleColor} ${className}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${buttonClasses} ${styleWidth}`}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
