import React from 'react';

export const TextInput = (props) => {
  const { defaultValue, onSubmit, onChange } = props;
  const onKeyPress = (e) => {
    if (e.which === 13 && onSubmit) {
      onSubmit();
    }
  };
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={defaultValue}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    />
  );
};
