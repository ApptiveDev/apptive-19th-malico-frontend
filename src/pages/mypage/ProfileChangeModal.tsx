import Modal from '@components/modal/Modal.tsx';

interface ProfileChangeModalProps {
  setClosed: ()=>void,
}
const ProfileChangeModal = ({setClosed}: ProfileChangeModalProps) => {
  return (<Modal title={'프로필 사진'}
    style={{
      height: '100px',
    }}
    setClosed={setClosed}
  >
    <div className='flex flex-col w-full grow items-center justify-center cursor-pointer'>
      프로필 사진 업로드하기
    </div>
  </Modal>);
};

export default ProfileChangeModal;
