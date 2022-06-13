import useSWRInfinite from 'swr/infinite';

type ListData = {
  owner: {
    avatar_url: string;
    login: string;
  };
  name: string;
  forks: number;
  open_issues: number;
  stargazers_count: number;
};

type GithubInfo = {
  items?: ListData[];
  total_count?: number;
  incomplete_results?: boolean;
};

export const getGithubInfo = (type: string) => {
  const getKey = (index: number) =>
    `https://api.github.com/search/repositories?q=stars:%3E1${
      type ? '+language:' + type : ''
    }&sort=starts&order=desc&type=Repositories&page=${index + 1}`;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, mutate, ...others } = useSWRInfinite<GithubInfo>(getKey, fetcher, {
    shouldRetryOnError: false,
    revalidateFirstPage: false,
  });

  return {
    ...others,
    data: Array.isArray(data)
      ? data.reduce((a: ListData[], c: GithubInfo = {}) => {
          const { items = [] } = c;
          a.push(...items);
          return a;
        }, [])
      : [],
    total: Array.isArray(data) ? (data[0] && data[0].total_count) || 0 : 0,
    reload: () => {
      mutate(data);
    },
  };
};

export const getUser = async (userId: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${userId}`);
    return res.json();
  } catch (err) {
    alert(err);
  }
};
