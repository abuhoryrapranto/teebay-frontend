import React, { FC } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode,
  name: string,
  click?: () => void
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, name, click }) => {
  if (!isOpen) return null;

  return (

    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto bg-gray-500 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    {name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  {children}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <Button name='No' backgroundColor='bg-red-500' click={onClose} />
                    <Button name='Yes' backgroundColor='bg-green-500' marginLeft='ml-4' click={click} />
                </div>
              </div>
            </div>
          </div>
  );
};

export default Modal;
