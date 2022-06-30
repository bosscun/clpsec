import React, { PropsWithChildren } from 'react';

const Box:React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='d-flex justify-content-center'>
      {children}
    </div>
  );
}

export default Box;
