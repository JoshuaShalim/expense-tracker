import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="relative w-[95vw] sm:w-[600px] max-h-[90vh] overflow-y-auto p-4">
        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 overflow-y-auto max-h-[75vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
