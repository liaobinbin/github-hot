import React from 'react';
import { Tab, Card, Loading } from '@components';
import { useStateWithLocalStorage } from '@hooks';
import { getGithubInfo } from '@api';

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

const mountScrollEvent = (cb: () => void) => {
  const fn = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight) {
      cb();
    }
  };
  document.removeEventListener('scroll', fn);
  document.addEventListener('scroll', fn);
};

export const Popular: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [type, setType] = useStateWithLocalStorage<string>('type', 'all');
  const [typeList] = React.useState<string[]>(['all', 'javascript', 'ruby', 'java', 'css', 'python']);
  const [list, setList] = React.useState<ListData[]>([]);

  // pages
  const [total, setTotal] = React.useState<number>(0);
  const [current, setCurrent] = React.useState<number>(1);
  const size = 30;

  const getData = async (type: string, append = false) => {
    if (total && total <= current * size) {
      return false;
    }
    setLoading(true);

    try {
      const page = append ? current + 1 : 1;
      const res = await getGithubInfo(type, page);
      !append ? setList(res.items) : setList([...list, ...res.items]);
      console.log(list, type);
      setTotal(res.total_count);
      setCurrent(page);
      setType(type);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  React.useEffect(() => {
    getData(type);
  }, []);
  React.useEffect(() => {
    mountScrollEvent(() => {
      getData(type, true);
    });
  }, [list]);

  const handleTabChange = (type: string) => {
    setType(type);
    getData(type);
  };

  return (
    <div>
      <Tab list={typeList} select={type} onChange={handleTabChange} />
      {loading && <Loading />}
      <div className="container">
        {list.length !== 0 &&
          list.map((item, index) => {
            return (
              <Card
                key={`card-list-${index}`}
                rank={index + 1}
                avatar={item.owner.avatar_url}
                name={item.name}
                user={item.owner.login}
                star={item.stargazers_count}
                fork={item.forks}
                issue={item.open_issues}
              />
            );
          })}
      </div>
    </div>
  );
};
