import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AxiosInstance from '@utils/AxiosInstance.ts';
import Navbar from '@components/navbar/Navbar.tsx';
import ResponsiveContainer from '@components/container/ResponsiveContainer.tsx';
import ScrollableContainer from '@components/container/ScrollableContainer.tsx';
import PageContainer from '@components/container/PageContainer.tsx';

interface Notice {
  id: number;
  title: string;
  content: string;
  createDate: string;
}
interface NoticesResponse {
  data: Notice;
}

const NoticeDetailPage = () => {
  const {id} = useParams<{id: string}>();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await AxiosInstance
          .get<NoticesResponse>(`http://43.201.242.123:8080/api/notification/notice/${id}`);
        setNotice(response.data.data);
        console.log(notice);
      } catch (error) {
        console.error('Error fetching notice:', error);
      }
    };
    fetchNotice();
  }, [id]);

  return (
    <PageContainer>

      <Navbar title="공지사항" hasBackwardButton={true} />
      <ResponsiveContainer>
        <ScrollableContainer>
          <div className="w-full max-w-[500px]">
            {notice ? (
              <div>
                <h1 className='font-bold text-2xl mt-8'>{notice.title}</h1>
                <p className='text-sm mt-2'>{new Date(notice.createDate).toLocaleString()}</p>
                <div className='mt-10 whitespace-pre-wrap'>{notice.content}</div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </ScrollableContainer>
      </ResponsiveContainer>
    </PageContainer>
  );
};

export default NoticeDetailPage;
