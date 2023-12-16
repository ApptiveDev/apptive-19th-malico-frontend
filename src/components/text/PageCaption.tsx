interface PageCaptionProps {
  lines: string[];
}
const PageCaption = ({lines}: PageCaptionProps) => {
  const getLines = () => {
    return lines.map((line) => <p key={line}>{line}</p>);
  };
  return <div className='leading-8 font-semibold text-[24px] py-8 px-6'>
    {getLines()}
  </div>;
};
export default PageCaption;
