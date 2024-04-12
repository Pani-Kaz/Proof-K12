import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx'
import AppRoutes from './router.js';
import './styles/globals.css';

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
