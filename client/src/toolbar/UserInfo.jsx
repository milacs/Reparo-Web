import React from 'react';

export const UserInfo = ({ src, name }) => {
  return (
    <div className="rounded-md flex px-2 py-1 h-10">
      <img
        src={src}
        referrerPolicy="no-referrer"
        className="rounded-full me-2 border shadow"
      />
      <span className="my-auto text-sm hidden sm:block">{name}</span>
    </div>
  );
};
