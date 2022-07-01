import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Card, Loading, Tab } from '@components';
import { LanguageType } from '@enum';
import { usePopular } from '@hooks';
import { Col, Row } from 'react-flexbox-grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';

// from enum get TypeList
const typeList = Object.keys(LanguageType).map((name) => {
  return LanguageType[name as keyof typeof LanguageType];
});

export const Popular: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'all';
  const { list, isLoading, isError, loadMore, reload, total } = usePopular(type);

  const errorLoader = () => {
    return (
      <Row center="xs">
        <Col>
          <button onClick={reload}>重新加载</button>
        </Col>
      </Row>
    );
  };
  const loader = () => {
    if (isError) {
      return errorLoader();
    }
    if (isLoading) {
      return <Loading />;
    }
    return null;
  };

  return (
    <>
      <Tab
        link={(item) => {
          return (
            <Link to={`/?type=${item}`} className={item === type ? 'active' : ''}>
              {item}
            </Link>
          );
        }}
        list={typeList}
        select={type}
      />
      <div className="container">
        {list && list.length !== 0 && (
          <InfiniteScroll
            dataLength={list.length}
            next={loadMore}
            hasMore={list.length < total}
            loader={<>{loader()}</>}
            scrollableTarget="scrollable"
          >
            <Row>
              {list.map((item, index) => {
                return (
                  <Col xs={6} md={4} lg={3} key={`card-list-${index}`}>
                    <Card
                      rank={index + 1}
                      avatar={item.owner.avatar_url}
                      name={item.name}
                      user={item.owner.login}
                      star={item.stargazers_count}
                      fork={item.forks}
                      issue={item.open_issues}
                    />
                  </Col>
                );
              })}
            </Row>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};
