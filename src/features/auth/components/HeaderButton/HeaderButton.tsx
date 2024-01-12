import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderButton.module.scss';

interface HeaderButtonProps {
  text: string;
  icon: ReactNode;
  isLink?: boolean;
  link?: string;
  onClick?: () => void;
}

export const HeaderButton = ({
  text,
  icon,
  isLink,
  link = '#',
  onClick,
}: HeaderButtonProps) => {
  const content = (
    <div className={styles.HeaderButton}>
      <span className={styles.text}>{text}</span>
      <span className={styles.icon}>{icon}</span>
    </div>
  );

  return isLink ? (
    <Link
      to={link}
      className={styles.wrap}
      onClick={() => onClick && onClick()}
    >
      {content}
    </Link>
  ) : (
    <button className={styles.wrap} onClick={() => onClick && onClick()}>
      {content}
    </button>
  );
};
