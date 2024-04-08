import Promo from './Promo/Promo.jsx';
import NavTab from './NavTab/NavTab.jsx';
import AboutProject from './AboutProject/AboutProject.jsx';
import Technology from './Technology/Technology.jsx';
import AboutStudent from './AboutStudent/AboutStudent.jsx';

function Main() {
  return (
    <main className='main'>
      <Promo />
      <NavTab />
      <AboutProject />
      <Technology />
      <AboutStudent />
    </main>
  );
}
export default Main;
