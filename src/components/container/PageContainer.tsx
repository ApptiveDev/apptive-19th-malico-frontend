import {ContainerProps} from '@components/container/Container.ts';

const PageContainer = (props: ContainerProps) => {
  return <div className='flex flex-col h-[100dvh] w-[100dvw]'>
    {props.children}
  </div>;
};
export default PageContainer;
