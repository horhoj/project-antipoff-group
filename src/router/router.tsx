import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '~/router/routePaths';
import { UserListPage } from '~/features/userList/pages/UserListPage';
import { UserPage } from '~/features/user/pages/UserPage';
import { SignUpPage } from '~/features/auth/pages/SignUpPage';
import { useAppSelector } from '~/store/hooks';

export const Router = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <>
      <Routes>
        {!isAuth && (
          <>
            <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
            <Route path={'*'} element={<Navigate to={ROUTES.SIGN_UP} />} />
          </>
        )}
        {isAuth && (
          <>
            <Route path={ROUTES.USERS} element={<UserListPage />} />
            <Route path={ROUTES.USER} element={<UserPage />} />
            <Route path={'*'} element={<Navigate to={ROUTES.USERS} />} />
          </>
        )}
      </Routes>
    </>
  );
};
