/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

export const Modal = (props) => {
  const { onCloseModal, title, children } = props;
  const modalTitle = title || 'title';

  return (
    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-full justify-center items-center">
      <div className="relative p-4 w-full max-w-lg h-auto">
        <div className="relative px-4 py-2 bg-white rounded-lg shadow">
          <div className="modal-head flex justify-between items-start py-2 rounded-t border-b">
            <h3 className="text-xl font-semibold text-gray-70">{modalTitle}</h3>
            <button onClick={onCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" type="button">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="modal-content pt-4 pb-6">{children}</div>
        </div>
      </div>
      <button onClick={onCloseModal} className="overlay absolute w-full h-full bg-gray-900/30 -z-10" />
    </div>
  );
};
