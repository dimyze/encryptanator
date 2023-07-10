import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Encryptanator</h1>
      <p className={styles.tagline}>No need to come up with passwords ever</p>
    </header>
  );
}

export default Header;
