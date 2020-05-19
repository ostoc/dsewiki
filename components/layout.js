import styles from "./layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Layout;
