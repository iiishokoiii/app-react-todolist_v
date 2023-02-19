import React from 'react';

export const Button = (props) => {
  const { onClick, clazz, optionalStyle, children } = props;
  // const baseStyle = 'px-5 py-2.5 focus:outline-none focus:ring-4 font-medium rounded-lg text-center text-sm mr-2 mb-2';
  const baseStyle = 'px-5 py-2.5 focus:outline-none font-medium rounded-lg text-center text-sm ml-2';
  const modifier = {
    '-primary': 'text-blue-400 bg-white hover:text-white border border-blue-400 hover:bg-blue-400',
    '-disable': 'text-white bg-blue-400 cursor-not-allowed text-sm text-center',
    '-normal': 'text-gray-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-900',
  };

  const buttonStyle = (_clazz) => (modifier[_clazz] ? modifier[_clazz] : modifier['-normal']);

  return (
    <button className={`${baseStyle} ${buttonStyle(clazz)} ${optionalStyle}`} onClick={onClick} type="button">
      {children}
    </button>
  );
};
