import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './UserListPage.module.scss';
import { getSearchParams } from '~/features/userList/pages/UserListPage/userListPage.helpers';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { userListSlice } from '~/features/userList/store/userListSlice';
import { Paginator } from '~/ui/Paginator';
import { UserCard } from '~/features/userList/components/UserCard';

export const UserListPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = getSearchParams(searchParams);

  useEffect(() => {
    dispatch(userListSlice.thunks.fetchUserListThunk({ page }));
  }, [page]);

  const fetchUserListRequest = useAppSelector(
    (state) => state.userList.fetchUserListRequest,
  );

  const handleChangePage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className={styles.UserListPage}>
      <div className={styles.userList}>
        {fetchUserListRequest.data?.data.map((user) => (
          <UserCard userData={user} key={user.id} />
        ))}
      </div>

      {fetchUserListRequest.data && (
        <Paginator
          currentPage={fetchUserListRequest.data.page}
          onPage={handleChangePage}
          maxPage={fetchUserListRequest.data.total_pages}
        />
      )}
      {/*<DevView data={fetchUserListRequest} />*/}
    </div>
  );
};
