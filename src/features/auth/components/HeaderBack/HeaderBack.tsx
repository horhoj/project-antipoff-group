import styles from './HeaderBack.module.scss';
import { HeaderButton } from '~/features/auth/components/HeaderButton';
import { HeaderBackIcon } from '~/assets/icons';

interface HeaderBackProps {
  link: string;
}

export const HeaderBack = ({ link }: HeaderBackProps) => {
  return (
    <div className={styles.HeaderBack}>
      <HeaderButton
        text={'Назад'}
        icon={<HeaderBackIcon />}
        isLink={true}
        link={link}
      />
    </div>
  );
};
