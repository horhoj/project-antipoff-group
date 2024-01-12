import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';
import { FetchUserListResponseItem } from '~/features/userList/types/userList';
import { LikeIcon } from '~/assets/icons';

interface UserCardProps {
  userData: FetchUserListResponseItem;
  link: string;
  isLike: boolean;
  onLikeClick: () => void;
}

export const UserCard = ({
  userData,
  link,
  isLike,
  onLikeClick,
}: UserCardProps) => {
  const handleLikeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeClick();
  };

  return (
    <Link to={link} className={styles.UserCard}>
      <button className={styles.like} onClick={handleLikeToggle}>
        <LikeIcon isLike={isLike} />
      </button>
      <img src={userData.avatar} alt="" className={styles.avatar} />
      <div
        className={styles.name}
      >{`${userData.first_name} ${userData.last_name}`}</div>
    </Link>
  );
};
