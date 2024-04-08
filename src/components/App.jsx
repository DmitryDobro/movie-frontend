import React from 'react';
import {Route, Routes} from 'react-router-dom';
import '../App.css';
import Landing from './Landing/Landing.jsx';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import SavedMovie from './SavedMovie/SavedMovie';
import NotFound from './NotFound/NotFound.jsx';
import MobileMenu from './MobileMenu/MobileMenu.jsx';

function App() {
  const [isLoggin, setIsLoggin] = React.useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = React.useState(false);
  const handleMobileMenu = () => {
    console.log(isOpenMobileMenu);
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} />} />
        <Route path='/signin' element={<Login onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} />} />
        <Route path='/signup' element={<Registration onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} />} />
        <Route path='/profile' element={<Profile onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} />} />
        <Route path='/movies' element={<Movies onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} />} />
        <Route
          path='/saved-movies'
          element={<SavedMovie onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <MobileMenu isOpen={isOpenMobileMenu}></MobileMenu>
    </div>
  );
}

export default App;
