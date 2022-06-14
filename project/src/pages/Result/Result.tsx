import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading, IconText } from '@components';
import { getUser } from '@api';

import './index.scss';

interface ResultCardProps {
  winner: boolean;
  avatar: string;
  repos: number;
  name: string;
  location: string;
  following: number;
  follower: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ winner, avatar, repos, name, location, follower, following }) => {
  return (
    <div className="result-card">
      <h3>{winner ? 'Winner' : 'Loser'}</h3>
      <img src={avatar} alt="avatar" />
      <h4>Scroes: {repos}</h4>
      <h3>{name}</h3>
      <div className="result-card-detail">
        <IconText icon="location-arrow">{location}</IconText>
        <IconText icon="users">{follower}</IconText>
        <IconText icon="user-plus">{following}</IconText>
        <IconText icon="code">{repos}</IconText>
      </div>
    </div>
  );
};

interface GithubUserData {
  public_repos: number;
  avatar_url: string;
  name: string;
  location: string;
  followers: number;
  following: number;
}

export const Result: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [p1Data, setP1Data] = React.useState<GithubUserData>();
  const [p2Data, setP2Data] = React.useState<GithubUserData>();

  const [search] = useSearchParams();
  const p1 = search.get('p1');
  const p2 = search.get('p2');

  const getPlayerInfo = async () => {
    if (p1 && p2) {
      setLoading(true);
      const data1 = await getUser(p1);
      const data2 = await getUser(p2);
      setLoading(false);
      setP1Data(data1);
      setP2Data(data2);
    }
  };

  React.useEffect(() => {
    getPlayerInfo();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        {p1Data && p2Data && (
          <div className="result">
            <ResultCard
              winner={p1Data.public_repos > p2Data.public_repos}
              repos={p1Data.public_repos}
              avatar={p1Data.avatar_url}
              name={p1Data.name}
              location={p1Data.location}
              follower={p1Data.followers}
              following={p1Data.following}
            />
            <ResultCard
              winner={p2Data.public_repos > p1Data.public_repos}
              repos={p2Data.public_repos}
              avatar={p2Data.avatar_url}
              name={p2Data.name}
              location={p2Data.location}
              follower={p2Data.followers}
              following={p2Data.following}
            />
          </div>
        )}
      </div>
    </>
  );
};
