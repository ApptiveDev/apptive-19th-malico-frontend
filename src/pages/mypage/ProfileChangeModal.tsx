import Modal from '@components/modal/Modal.tsx';

interface ProfileChangeModalProps {
  setClosed: ()=>void,
}
const ProfileChangeModal = ({setClosed}: ProfileChangeModalProps) => {
  return (<Modal title={'프로필 사진'}
    style={{
      height: '138px',
    }}
    setClosed={setClosed}
  >

  </Modal>);
};

export default ProfileChangeModal;
