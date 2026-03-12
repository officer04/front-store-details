import styles from './AboutCompany.module.scss';

const AboutCompany = () => {
  return (
    <div className={styles.aboutCompany}>
      <div className={styles.container}>
        <h1 className={styles.title}>Почему стоит выбрать именно нас?</h1>
        <div className={styles.card}>
          <p>Аналоги которые хорошо “отходят”</p>
          <p>Цены на 30 - 50 % ниже чем у конкурентов</p>
          <p>Никаких подделок</p>
          <p>Быстро привезем редкие детали под заказ</p>
          <p>Посоветуем проверенную СТО для ремонта машины</p>
          <p>Сэкономьте до -15%</p>
          <p>Доставим по красноярску и отправим в ваш город</p>
          <p>Граммотная и честная консультация по ремонту автомобиля</p>
          <h3 className={styles.text}>
            Все еще сомневаетесь в своем выборе? Посмотрите наши отзывы!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
