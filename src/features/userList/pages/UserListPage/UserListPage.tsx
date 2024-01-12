import { generatePath, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './UserListPage.module.scss';
import { getSearchParams } from '~/features/userList/pages/UserListPage/userListPage.helpers';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { userListSlice } from '~/features/userList/store/userListSlice';
import { Paginator } from '~/ui/Paginator';
import { UserCard } from '~/features/userList/components/UserCard';
import { ROUTES } from '~/router/routePaths';
import { HeaderLogout } from '~/features/auth/components/HeaderLogout';

const LS_LIKE_DATA_KEY = 'LS_LIKE_DATA_KEY';

export const UserListPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = getSearchParams(searchParams);
  const [likeData, setLikeData] = useState<Record<number, boolean>>(() => {
    const data = localStorage.getItem(LS_LIKE_DATA_KEY) ?? '{}';
    return JSON.parse(data);
  });

  useEffect(() => {
    dispatch(userListSlice.thunks.fetchUserListThunk({ page }));
  }, [page]);

  const fetchUserListRequest = useAppSelector(
    (state) => state.userList.fetchUserListRequest,
  );

  const handleChangePage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleLikeClk = (id: number) => {
    setLikeData((prev) => {
      const newLikeData = { ...prev, [id]: !prev[id] };
      localStorage.setItem(LS_LIKE_DATA_KEY, JSON.stringify(newLikeData));
      return newLikeData;
    });
  };

  return (
    <div className={styles.UserListPage}>
      <div className={styles.header}>
        <HeaderLogout />
        <div className={styles.bigTitle}>Наша команда</div>
        <div className={styles.title}>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </div>
      </div>
      <div className={styles.userList}>
        {fetchUserListRequest.data?.data.map((user) => (
          <UserCard
            userData={user}
            key={user.id}
            link={generatePath(ROUTES.USER, { id: user.id.toString() })}
            isLike={Boolean(likeData[user.id])}
            onLikeClick={() => handleLikeClk(user.id)}
          />
        ))}
      </div>

      {fetchUserListRequest.data && (
        <Paginator
          currentPage={fetchUserListRequest.data.page}
          onPage={handleChangePage}
          maxPage={fetchUserListRequest.data.total_pages}
        />
      )}
    </div>
  );
};
