import styles from '../scss/components/header.module.scss';
const Header: React.FC = () => {
  return (
    <div>
      <h1 className={styles.title_h1}>React Weather</h1>
      <h4 className={styles.title_h4}>лучшие прогнозы во вселенной</h4>
    </div>
  );
};

export default Header;
