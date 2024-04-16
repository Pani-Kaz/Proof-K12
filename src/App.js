import { useEffect, useState } from 'react';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx'
import AppRoutes from './router.js';
import './styles/globals.css';
import Loading from './pages/Loading.tsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);
  
    window.addEventListener("load", () => {
      clearTimeout(timer);
      setLoading(false);
    });
  
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
      {loading && <Loading />}
    </>
  );
}

export default App;
