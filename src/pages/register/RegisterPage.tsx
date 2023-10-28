import PageContainer from '@components/container/PageContainer.tsx';
import Navbar from '@components/navbar/Navbar.tsx';

const RegisterPage = () => {
  return (
    <PageContainer>
      <Navbar title='가입 유형 선택' hasBackwardButton={true} hasProgressBar={true}
        progressNumerator={1} progressDominator={4} >
      </Navbar>
    </PageContainer>
  );
};

export default RegisterPage;
