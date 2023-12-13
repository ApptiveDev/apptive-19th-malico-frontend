import {ContainerProps} from '@components/container/Container.ts';

const ScrollableContainer = (props: ContainerProps) => {
  return <div className={`flex flex-col items-center 
    max-h-[calc(100%-145px)] h-full w-[100%] overflow-y-auto`}>
    {props.children}
  </div>;
};
export default ScrollableContainer;
