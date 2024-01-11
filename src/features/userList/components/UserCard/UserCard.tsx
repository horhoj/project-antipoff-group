import styles from './UserCard.module.scss';
import { FetchUserListResponseItem } from '~/features/userList/types/userList';
import { DevView } from '~/ui/DevView';

interface UserCardProps {
  userData: FetchUserListResponseItem;
}

export const UserCard = ({ userData }: UserCardProps) => {
  return (
    <div className={styles.UserCard}>
      <img src={userData.avatar} alt="" className={styles.avatar} />
      <div
        className={styles.name}
      >{`${userData.first_name} ${userData.last_name}`}</div>
    </div>
  );
};
