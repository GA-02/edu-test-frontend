import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import PageMain from './PageMain';
import PageLectures from './PageLectures';
import PageTests from './PageTests';
import PageError404 from './PageError404';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <main>
      <Router >
        <Routes>
          <Route  path='/' element={<PageMain />} />
          <Route  path='/lectures' element={<PageLectures />} />
          <Route  path='/tests' element={<PageTests />} />
          <Route path="*" element={<PageError404 />} />

        </Routes>
      </Router>
      </main>
      <Footer />
    </>
  );
}

export default App;
