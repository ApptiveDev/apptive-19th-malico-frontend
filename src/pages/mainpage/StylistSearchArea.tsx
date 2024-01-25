import Dropdown from '@components/input/Dropdown.tsx';
import {useEffect, useState} from 'react';
import stylistTypes from '@constants/stylistTypes.ts';
import regionTypes from '@constants/regionTypes.ts';
import exampleStylistProfile2 from '@assets/images/exampleStylistProfile2.png';
import axiosInstance from '@utils/AxiosInstance.ts';
import {StylistSearchInfo} from '@/models/UserInfo.ts';

const STYLE_ALL = '모든 스타일';
const REGION_ALL = '모든 지역';
const GENDER_ALL = '모든 성별';

interface SearchData {
  style?: string,
  region?: string,
  gender?: string,
}
const StylistSearchArea = () => {
  const [style, setStyle] = useState<string>(STYLE_ALL);
  const [region, setRegion] = useState<string>(REGION_ALL);
  const [gender, setGender] = useState<string>(GENDER_ALL);

  const [searchResult, setSearchResult] =
    useState<StylistSearchInfo[]>([]);

  useEffect(() => {
    const data: SearchData = {};
    if (style !== STYLE_ALL) {
      data.style = style;
    }
    if (region !== REGION_ALL) {
      data.region = region;
    }
    if (gender !== GENDER_ALL) {
      data.gender = gender;
    }
    axiosInstance.post('/api/home/filter', data).then((res) => {
      console.log(data);
      const result: StylistSearchInfo[] = [];
      res.data.map((stylist: StylistSearchInfo) => {
        result.push(stylist);
      });
      setSearchResult(result);
    }).catch((err) => {
      console.log(err);
    });
  }, [style, region, gender]);

  const getFoundStylist = () => {
    const ret = [];
    for (const stylist of searchResult) {
      const key = 'stylistsearch-' + stylist.style_id;
      ret.push(
        <img className='w-[156px] h-[156px] rounded-md cursor-pointer'
          src={stylist.img ?? exampleStylistProfile2} key={key} />);
    }
    return ret;
  };

  return <div className='flex flex-col w-full grow'>
    <p className='text-[20px] font-semibold mb-2'>탐색</p>
    <div className='flex gap-2 flex-wrap'>
      <Dropdown selected={style} setSelected={(s) => {
        setStyle(s);
      }} selectable={stylistTypes} />
      <Dropdown selected={region}
        setSelected={(s) => {
          setRegion(s);
        }} selectable={regionTypes} />
      <Dropdown selected={gender}
        setSelected={(s) => {
          setGender(s);
        }} selectable={['모든 성별', '남', '여']} style={{
          width: '100px',
          height: '90px',
        }} />
    </div>
    <div className='mt-5 mb-5 grow flex flex-wrap gap-3 justify-start'>
      {getFoundStylist()}
    </div>
  </div>;
};
export default StylistSearchArea;
