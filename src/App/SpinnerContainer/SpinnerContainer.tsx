import { useAppSelector } from '~/store/hooks';
import { Spinner } from '~/ui/Spinner';

export function SpinnerContainer() {
  const isLoading = useAppSelector(
    (state) =>
      state.auth.signUpRequest.isLoading ||
      state.user.fetchUserRequest.isLoading ||
      state.userList.fetchUserListRequest.isLoading,
  );

  return <Spinner isShow={isLoading} />;
}
