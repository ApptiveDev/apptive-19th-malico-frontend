import {ReactNode} from 'react';

type pageContainerProps = {
  children?: ReactNode
}
const PageContainer = (props: pageContainerProps) => {
  return <div className='flex justify-center h-[100dvh] w-[100dvw]'>
    <div className='flex flex-col w-[100%] max-w-[400px]'>
      {props.children}
    </div>
  </div>;
};
export default PageContainer;
