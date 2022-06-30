import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}> & React.HTMLAttributes<HTMLDivElement>;
const BoxItem:React.FC<Props> = ({ className, children }) => {
  return (
    <span className={`w-25 p-2 rounded-pill border p-2 m-2 ${className}`}>
      {children}
    </span>
  );
}

export default BoxItem;
