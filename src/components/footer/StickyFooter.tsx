import {ReactNode} from 'react';

interface StickyFooterProps {
  children?: ReactNode;
}

const StickyFooter = ({children}: StickyFooterProps) => {
  return (
    <footer className='sticky pt-2 h-auto w-[100%]
     flex flex-row justify-center'>
      {children}
    </footer>
  );
};

export default StickyFooter;
