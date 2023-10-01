import {ReactNode} from 'react';

type pageContainerProps = {
  children?: ReactNode
}
const PageContainer = (props: pageContainerProps) => {
  return <div className="flex flex-col h-[100vh] w-[100vw]">
    {props.children}
  </div>;
};
export default PageContainer;
