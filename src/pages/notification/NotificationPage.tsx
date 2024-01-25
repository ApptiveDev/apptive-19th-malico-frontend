import {useState, useEffect} from 'react';
import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import AxiosInstance from '@utils/AxiosInstance.ts';

interface Notice {
  id: number;
  title: string;
  content: string;
  createDate: Date;
  isUnread: boolean;
}

interface NoticesResponse {
  noticeDtoList: Notice[];
  readNotice: number[];
}

interface Inquiry {
  id: number;
  title: string;
  content: string;
  createDate: string;
}

// InquiryResponse 인터페이스를 추가합니다.
interface InquiryPreviewDtoList {
  inquiryPreviewDtoList: Inquiry[];
}

interface InquiryResponse {
  data: InquiryPreviewDtoList
}

const NotificationPage = (): ReactNode => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [tab, setTab] = useState('notice');

  // 읽지 않은 공지사항 수를 상태로 관리합니다.
  const [unreadNoticesCount, setUnreadNoticesCount] = useState(0);
  const [unreadInquiryCount, setUnreadInquiryCount] = useState(0);
  const [unreadEtcCount] = useState(0);


  useEffect(() => {
    // 공지사항
    AxiosInstance.get<NoticesResponse>('http://43.201.242.123:8080/api/notification/notice')
      .then((response) => {
        console.log(setUnreadInquiryCount);
        // 서버로부터 받은 데이터에서 'noticeDtoList'를 추출합니다.
        const fetchedNotices = response.data.noticeDtoList.map((notice) => {
          return {
            id: notice.id,
            title: notice.title,
            content: notice.content,
            // 서버로부터 받은 'createDate' 문자열을 `Date` 객체로 변환합니다.
            createDate: new Date(notice.createDate),
            isUnread: !response.data.readNotice.includes(notice.id),
          } as Notice;
        });
        setNotices(fetchedNotices);

        // 읽지 않은 공지사항의 개수를 업데이트합니다.
        const unreadNotices = response.data.noticeDtoList.filter(
          (notice) => !response.data.readNotice.includes(notice.id),
        );
        setUnreadNoticesCount(unreadNotices.length);
        setNotices(fetchedNotices);
      })
      .catch((error) => {
        // 오류 발생시 콘솔에 출력합니다.
        console.error('Error fetching notices:', error);
      });

    // 서비스 문의
    AxiosInstance.get<InquiryResponse>('http://43.201.242.123:8080/api/service/inquiry')
      .then((response) => {
        const fetchedInquiries = response.data.data.inquiryPreviewDtoList.map((inquiry) => {
          return {
            id: inquiry.id,
            title: inquiry.title,
            content: inquiry.content,
            createDate: new Date(inquiry.createDate),
          } as unknown as Inquiry;
        });
        setInquiries(fetchedInquiries);
      })
      .catch((error) => {
        console.error('Error fetching inquiries:', error);
      });
  }, []);
  return (
    <PageContainer>

      <Navbar title="알림" hasBackwardButton={true} />
      <ResponsiveContainer>
        <ScrollableContainer>
          <div className="flex w-full mx-auto">
            <div
              className={`flex-auto text-center py-4 font-semibold 
          ${tab === 'notice' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              onClick={() => setTab('notice')}>
              공지사항({unreadNoticesCount})</div>

            <div
              className={`flex-auto text-center py-4 font-semibold 
          ${tab === 'inquiry' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              onClick={() => setTab('inquiry')}>서비스 문의({unreadInquiryCount})</div>

            <div
              className={`flex-auto text-center py-4 font-semibold 
          ${tab === 'others' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              onClick={() => setTab('others')}>기타({unreadEtcCount})</div>
          </div>

          {tab === 'notice' && (
            <div className="mt-8 flex flex-col w-full max-w-[500px]">
              {notices.map((notice, index) => (
                <div className={`py-2 ${index < notices.length - 1 ? 'border-b-2' : ''} 
                    ${notice.isUnread ? 'bg-blue-50' : ''}`} key={notice.id}>
                  <Link to={`/notice/${notice.id}`}>
                    <h2 className="font-bold text-xl mt-3">{notice.title}</h2>
                    <p className="text-sm mb-3">{notice.createDate.toLocaleString()}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {tab === 'inquiry' && (
            <div className={'mt-8 flex flex-col w-full max-w-[500px]'}>
              {inquiries.map((inquiry) => (
                <div key={inquiry.id}>
                  <Link to={`/inquiry/${inquiry.id}`}>
                    <h2 className="font-bold text-xl mt-3">{inquiry.title}</h2>
                    <p>{inquiry.content}</p>
                    <p className="text-sm mb-3">{new Date(inquiry.createDate)
                      .toLocaleDateString()}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </ScrollableContainer>
      </ResponsiveContainer>
    </PageContainer>
  );
};

export default NotificationPage;
