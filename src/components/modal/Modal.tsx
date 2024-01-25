import {HTMLAttributes, ReactNode} from 'react';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  title: string,
  setClosed: () => void,
}
const Modal = ({children, title, setClosed, ...rest}: ModalProps) => {
  return <div className='absolute left-0 top-0 bg-[#1C1C1E4D]
   h-[100dvh] w-[100dvw] z-10 flex justify-center items-center'>
    <div className='h-[500px] w-[230px] bg-white rounded-xl flex flex-col' {...rest}>
      <div className='h-[44px] flex px-6 py-3' >
        <div className='h-full grow'>
          <p className='font-semibold text-[18px]'>{title}</p>
        </div>
        <div className='h-full flex items-center pt-2 cursor-pointer' onClick={setClosed}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path d="M8.91406 10.75L2.78906 16.875C2.5599 17.1042 2.26823 17.2188 1.91406 17.2188C1.5599 17.2188 1.26823 17.1042 1.03906 16.875C0.809896 16.6458 0.695312 16.3542 0.695312 16C0.695312 15.6458 0.809896 15.3542 1.03906 15.125L7.16406 9L1.03906 2.875C0.809896 2.64583 0.695312 2.35417 0.695312 2C0.695312 1.64583 0.809896 1.35417 1.03906 1.125C1.26823 0.895833 1.5599 0.78125 1.91406 0.78125C2.26823 0.78125 2.5599 0.895833 2.78906 1.125L8.91406 7.25L15.0391 1.125C15.2682 0.895833 15.5599 0.78125 15.9141 0.78125C16.2682 0.78125 16.5599 0.895833 16.7891 1.125C17.0182 1.35417 17.1328 1.64583 17.1328 2C17.1328 2.35417 17.0182 2.64583 16.7891 2.875L10.6641 9L16.7891 15.125C17.0182 15.3542 17.1328 15.6458 17.1328 16C17.1328 16.3542 17.0182 16.6458 16.7891 16.875C16.5599 17.1042 16.2682 17.2188 15.9141 17.2188C15.5599 17.2188 15.2682 17.1042 15.0391 16.875L8.91406 10.75Z" fill="#1C1C1E"/>
          </svg>
        </div>
      </div>
      <hr />
      {children}
    </div>
  </div>;
};

export default Modal;
