export const getSearchParams = (searchParams: URLSearchParams) => {
  const pageFromSearchParams = searchParams.get('page') ?? undefined;
  let page = 1;
  if (pageFromSearchParams) {
    const tmp = Number.parseInt(pageFromSearchParams);
    if (Number.isFinite(tmp)) {
      page = tmp;
    }
  }

  return {
    page,
  };
};
