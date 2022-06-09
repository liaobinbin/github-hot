import React, { PropsWithChildren } from 'react';

export interface IconTextProps extends PropsWithChildren {
  icon?: string;
  color?: string;
}

export const IconText: React.FC<IconTextProps> = ({ icon, color, children }) => {
  return (
    <span className="icon-text">
      <i className={`fa ${icon ? 'fa-' + icon : ''}`} style={{ color: color || '#000' }} />
      {children}
    </span>
  );
};
