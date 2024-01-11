import { useMemo } from 'react';
import classNames from 'classnames';
import styles from './Paginator.module.scss';
import { getUUID } from '~/utils/getUUID';

interface PaginatorProps {
  currentPage: number;
  onPage: (page: number) => void;
  maxPage: number;
}

export const Paginator = ({ currentPage, onPage, maxPage }: PaginatorProps) => {
  const pages = useMemo(
    () =>
      Array(maxPage)
        .fill(null)
        .map(() => getUUID()),
    [maxPage],
  );

  return (
    <div className={styles.Paginator}>
      {pages.map((id, i) => (
        <button
          key={id}
          onClick={() => onPage(i + 1)}
          className={classNames(
            styles.button,
            currentPage === i + 1 && styles.activeButton,
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
