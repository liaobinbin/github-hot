import React from 'react';
import { IconText } from '@components';
import { formatNumber } from '@util';

export interface CardProps {
  rank: number | string;
  avatar: string;
  name: string;
  user: string;
  star: number | string;
  fork: number | string;
  issue: number | string;
}

export const Card: React.FC<CardProps> = ({ rank, avatar, name, user, star, fork, issue }) => {
  return (
    <div className="card">
      <h3 className="card-rank">#{rank}</h3>
      <img alt="avatar" src={avatar} />
      <h4 className="card-name">{name}</h4>
      <IconText icon="user" color="orange">
        {formatNumber(user)}
      </IconText>
      <IconText icon="star" color="yellow">
        {formatNumber(star)} star
      </IconText>
      <IconText icon="code-fork" color="blue">
        {formatNumber(fork)} fork
      </IconText>
      <IconText icon="exclamation-triangle" color="red">
        {formatNumber(issue)} open Issue
      </IconText>
    </div>
  );
};
