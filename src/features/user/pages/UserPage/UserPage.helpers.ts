export const getParams = (idFromUrl: string | undefined) => {
  let id = null;
  if (idFromUrl) {
    const tmp = Number.parseInt(idFromUrl);
    if (Number.isFinite(tmp)) {
      id = tmp;
    }
  }

  return {
    id,
  };
};
