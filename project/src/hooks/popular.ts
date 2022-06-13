import { getGithubInfo } from '@api';

export const usePopular = (type: string) => {
  const { data, error, size, setSize, reload, isValidating, total } = getGithubInfo(type);
  const loadMore = () => {
    if (isValidating) {
      return;
    }
    setSize(size + 1);
  };

  return {
    // isLoading: (!data && !error) || !!(size > 0 && data && typeof data[size - 1] === 'undefined'),
    isLoading: isValidating,
    isError: !!error,
    list: data,
    total,
    loadMore,
    reload,
  };
};
