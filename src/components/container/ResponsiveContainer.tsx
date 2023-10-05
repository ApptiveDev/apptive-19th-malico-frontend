import {ContainerProps} from '@components/container/Container.ts';

const ResponsiveContainer = (props: ContainerProps) => {
  return <div className='flex flex-col w-[100dvw] max-w-[400px]'>
    {props.children}
  </div>;
};
export default ResponsiveContainer;
