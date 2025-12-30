import styles from './AppLayout.module.css';
import { ThemeToggle } from '../components/ThemeToggle';

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>TaskMaster</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2024 TaskMaster. Built with React + TypeScript.</p>
      </footer>
    </div>
  );
}

export default AppLayout;
