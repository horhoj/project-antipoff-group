import styles from './HeaderLogout.module.scss';
import { HeaderButton } from '~/features/auth/components/HeaderButton';
import { HeaderExitIcon } from '~/assets/icons';

export const HeaderLogout = () => {
  return (
    <div className={styles.HeaderLogout}>
      <HeaderButton text={'Выход'} icon={<HeaderExitIcon />} />
    </div>
  );
};
