import React from 'react';
import { Tab, Card } from '@components';
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

export const Popular: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [type, setType] = useStateWithLocalStorage<string>('type', 'all');
  const [typeList] = React.useState<string[]>(['all', 'javascript', 'ruby', 'java', 'css', 'python']);
  const [list, setList] = React.useState<ListData[]>([]);

  const getData = async (type: string, append = false) => {
    setLoading(true);

    try {
      const res = await getGithubInfo(type, 1);
      setList(res.items);
    } catch (err) {
      // Do something

      setLoading(false);
      alert(err);
    }
  };

  const handleTabChange = (type: string) => {
    setType(type);
    getData(type);
  };

  return (
    <div>
      <Tab list={typeList} select={type} onChange={handleTabChange} />
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
