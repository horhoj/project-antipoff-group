import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';
import { FetchUserListResponseItem } from '~/features/userList/types/userList';

interface UserCardProps {
  userData: FetchUserListResponseItem;
  link: string;
}

export const UserCard = ({ userData, link }: UserCardProps) => {
  return (
    <Link to={link} className={styles.UserCard}>
      <img src={userData.avatar} alt="" className={styles.avatar} />
      <div
        className={styles.name}
      >{`${userData.first_name} ${userData.last_name}`}</div>
    </Link>
  );
};
