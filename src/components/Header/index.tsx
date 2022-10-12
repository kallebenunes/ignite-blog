import Link from 'next/link';
import { ReactElement } from 'react';
import styles from './header.module.scss';

export default function Header(): ReactElement {
  // TODO
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="logo" />
          </a>
        </Link>
      </div>
    </header>
  );
}
