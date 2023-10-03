import {ReactNode} from 'react';

type pageContainerProps = {
  children?: ReactNode
}
const PageContainer = (props: pageContainerProps) => {
  return <div className='flex flex-col h-[100dvh] w-[100dvw]'>
    {props.children}
  </div>;
};
export default PageContainer;
