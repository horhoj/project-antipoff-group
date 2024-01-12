import { authSlice } from '../../store/authStore';
import styles from './HeaderLogout.module.scss';
import { HeaderButton } from '~/features/auth/components/HeaderButton';
import { HeaderExitIcon } from '~/assets/icons';
import { useAppDispatch } from '~/store/hooks';

export const HeaderLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(authSlice.thunks.signOutThunk());
  };

  return (
    <div className={styles.HeaderLogout}>
      <HeaderButton
        onClick={handleLogOut}
        text={'Выход'}
        icon={<HeaderExitIcon />}
      />
    </div>
  );
};
