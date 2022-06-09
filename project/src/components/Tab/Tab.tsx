import React from 'react';

export interface TabProps {
  list: string[];
  onChange: (value: string) => void;
  select?: string;
}

export const Tab: React.FC<TabProps> = ({ list, select, onChange }) => {
  const [current, setCurrent] = React.useState<string>(select || 'all');

  const handleCurrentChange = (value: string) => {
    onChange(value);
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
              {item}
            </li>
          );
        })}
    </ul>
  );
};
