import { RouteItem } from './types';
import { getUUID } from '~/utils/getUUID';
import { UserListPage } from '~/features/userList/pages/UserListPage';
import { Page404 } from '~/features/error404/pages/Error404Page/Page404';

export const routeList = [
  {
    id: getUUID(),
    name: 'userList',
    path: '/users',
    component: UserListPage,
    inMenu: true,
  },

  {
    id: getUUID(),
    name: 'error404',
    path: '*',
    component: Page404,
    inMenu: false,
  },
] as const satisfies readonly RouteItem[];
