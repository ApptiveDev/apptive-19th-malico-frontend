import {ReactNode} from 'react';

interface StickyFooterProps {
  children?: ReactNode;
}

const StickyFooter = ({children}: StickyFooterProps) => {
  return (
    <footer className="sticky bottom-0 py-4">
      {children}
    </footer>
  );
};

export default StickyFooter;
