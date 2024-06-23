import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Footer from './components/Footer/Footer';
import News from './pages/News/News';
import SignUp from './pages/SignUp/SignUp';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className='app'>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        <Route path='/news' element={<News />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/tips-tricks' element={<TipsTricks />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;