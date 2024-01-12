import styles from './HeaderBack.module.scss';
import { HeaderButton } from '~/features/auth/components/HeaderButton';
import { HeaderBackIcon } from '~/assets/icons';

interface HeaderBackProps {
  onClick: () => void;
}

export const HeaderBack = ({ onClick }: HeaderBackProps) => {
  return (
    <div className={styles.HeaderBack}>
      <HeaderButton
        text={'Назад'}
        icon={<HeaderBackIcon />}
        onClick={onClick}
      />
    </div>
  );
};
