import Navbar from '@components/navbar/Navbar.tsx';

const Home = () => {
  return (
    <>
      <Navbar title={'MARICO'} hasNotificationButton={true}
        containsHeadline={true}/>
    </>
  );
};

export default Home;
