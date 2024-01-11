import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '~/router/routePaths';
import { UserListPage } from '~/features/userList/pages/UserListPage';
import { UserPage } from '~/features/user/pages/UserPage';
import { Page404 } from '~/features/error404/pages/Error404Page';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.USERS} />} />
        <Route path={ROUTES.USERS} element={<UserListPage />} />
        <Route path={ROUTES.USER} element={<UserPage />} />
        <Route path={'*'} element={<Page404 />} />
      </Routes>
    </>
  );
};
