import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './UserPage.module.scss';
import { getParams } from '~/features/user/pages/UserPage/UserPage.helpers';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { userSlice } from '~/features/user/store/userSlice';
import { HeaderLogout } from '~/features/auth/components/HeaderLogout';
import { HeaderBack } from '~/features/auth/components/HeaderBack';
import { ROUTES } from '~/router/routePaths';
import { EmailIcon, TelephoneIcon } from '~/assets/icons';

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const { id: currentId } = getParams(id);
    if (currentId) {
      dispatch(userSlice.thunks.fetchUserThunk({ id: currentId }));
    }
  }, [id]);

  useEffect(
    () => () => {
      dispatch(userSlice.actions.clear());
    },
    [],
  );

  const fetchUserRequest = useAppSelector(
    (state) => state.user.fetchUserRequest,
  );

  return (
    <div className={styles.UserPage}>
      <div className={styles.header}>
        <HeaderBack link={ROUTES.USERS} />
        <HeaderLogout />
        {fetchUserRequest.data && (
          <div className={styles.HeaderDataWrap}>
            <img
              src={fetchUserRequest.data.data.avatar}
              className={styles.avatar}
              alt={'avatar'}
            />
            <div>
              <div
                className={styles.bigTitle}
              >{`${fetchUserRequest.data.data.first_name} ${fetchUserRequest.data.data.last_name}`}</div>
              <div className={styles.title}>Партнер</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.dataBlock}>
        <div className={styles.textWrap}>
          <div>
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты. Он
            помогает клиентам лучше понимать структуру рисков их бизнеса,
            улучшать процессы за счет применения новейших технологий и
            увеличивать продажи, используя самые современные аналитические
            инструменты.
          </div>
          <div>
            В работе с клиентами недостаточно просто решить конкретную проблему
            или помочь справиться с трудностями. Не менее важно уделять внимание
            обмену знаниями: {'"'}Один из самых позитивных моментов — это
            осознание того, что ты помог клиенту перейти на совершенно новый
            уровень компетентности, уверенность в том, что после окончания
            проекта у клиента есть все необходимое, чтобы дальше развиваться
            самостоятельно{'"'}.
          </div>
          <div>
            Помимо разнообразных проектов для клиентов финансового сектора,
            Сорин ведет активную предпринимательскую деятельность. Он является
            совладельцем сети клиник эстетической медицины в Швейцарии,
            предлагающей инновационный подход к красоте, а также инвестором
            других бизнес-проектов.
          </div>
        </div>
        <data>
          {fetchUserRequest.data && (
            <div className={styles.contacts}>
              <div className={styles.contactsItem}>
                <TelephoneIcon />
                <span>+7 (954) 333-44-55</span>
              </div>
              <div className={styles.contactsItem}>
                <EmailIcon />
                <span>{fetchUserRequest.data.data.email}</span>
              </div>
            </div>
          )}
        </data>
      </div>
    </div>
  );
};
