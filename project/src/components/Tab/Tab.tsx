import React from 'react';

import './index.scss';

export interface TabProps {
  list: string[];
  onChange?: (value: string) => void;
  select?: string;
  link?: (item: string) => React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ list, select, onChange, link }) => {
  const [current, setCurrent] = React.useState<string>(select || 'all');

  const handleCurrentChange = (value: string) => {
    onChange && onChange(value);
    setCurrent(value);
  };

  return (
    <ul className="tab">
      {list &&
        list.map((item, index) => {
          return (
            <li
              onClick={() => {
                handleCurrentChange(item);
              }}
              className={current === item ? 'active' : ''}
              key={`tab-list-${index}`}
            >
              {link ? link(item) : item}
            </li>
          );
        })}
    </ul>
  );
};
