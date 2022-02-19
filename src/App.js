import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import PageMain from './PageMain';
import PageCatalogLectures from './PageLectures/PageCatalogLectures';
import PageReadLectures from './PageLectures/PageReadLectures';
import PageAdmin from './PageAdmin';
import PageAdminUsers from './PageAdmin/PageAdminUsers';
import PageAdminTests from './PageAdmin/PageAdminTests';
import PageCatalogTests from './PageTests/PageCatalogTests';
import PagePassTest from './PageTests/PagesPassTest/PagePassTest';
import PageResultTest from './PageTests/PagesPassTest/PageResultTest';
import PageProfile from './PageProfile';
import PageError404 from './PageError404';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Router >
          <Routes>
            <Route path='/' element={<PageMain />} />
            <Route path='/lectures' element={<PageCatalogLectures />} />
            <Route path='/lecture/:id' element={<PageReadLectures />} />
            <Route path='/admin' element={<PageAdmin />} />
            <Route path='/admin/users' element={<PageAdminUsers />} />
            <Route path='/admin/test/:id' element={<PageAdminTests />} />
            <Route path='/admin/tests' element={<PageAdminTests />} />
            <Route path='/tests' element={<PageCatalogTests />} />
            <Route path='/test/:id' element={<PagePassTest />} />
            <Route path='/result/:id' element={<PageResultTest />} />
            <Route path='/profile' element={<PageProfile />} />
            <Route path="*" element={<PageError404 />} />

          </Routes>
        </Router>
      </main>
      <Footer />
    </>
  );
}

export default App;
