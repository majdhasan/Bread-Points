import React from 'react';

const FloatingButton = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 60,
        right: 60,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          borderRadius: 50,
          width: 60,
          height: 60,
          background: '#0a043c',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          boxShadow: '5px 5px 10px #999',
        }}
        onClick={onClick}
      >
        <i className='fa fa-plus' />
      </div>
    </div>
  );
};

export { FloatingButton };
