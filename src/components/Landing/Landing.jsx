import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer';

function Landing({onMobileMenu, isOpen, isLoggin}) {
  return (
    <>
      <Header onMobileMenu={onMobileMenu} isOpen={isOpen} isLoggin={isLoggin}></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}
export default Landing;
