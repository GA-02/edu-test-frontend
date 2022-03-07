import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import PageAdmin from './PageAdmin';
import PageAdminUsers from './PageAdmin/PageAdminUsers';
import PageAdminLectures from './PageAdmin/PageAdminLectures/PageMain';
import PageAdminTests from './PageAdmin/PageAdminTests';
import PageAdminLabs from './PageAdmin/PageAdminLabs/PageMain';
import PageAdminEditLecture from './PageAdmin/PageAdminLectures/PageEditLecture';
import PageAdminEditTest from './PageAdmin/PageEditTest';
import PageAdminEditLab from './PageAdmin/PageAdminLabs/PageEditLab';
import PageMain from './PageMain';
import PageCatalogLectures from './PageLectures/PageCatalogLectures';
import PageReadLecture from './PageLectures/PageReadLecture';
import PageCatalogLabs from './PageLabs/PageCatalogLabs';
import PageReadLab from './PageLabs/PageReadLab';
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
            <Route path='/admin' element={<PageAdmin />} />
            <Route path='/admin/users' element={<PageAdminUsers />} />
            <Route path='/admin/labs' element={<PageAdminLabs />} />
            <Route path='/admin/lab/:id' element={<PageAdminEditLab />} />
            <Route path='/admin/lecture/:id' element={<PageAdminEditLecture />} />
            <Route path='/admin/lectures' element={<PageAdminLectures />} />
            <Route path='/admin/test/:id' element={<PageAdminEditTest />} />
            <Route path='/admin/tests' element={<PageAdminTests />} />
            <Route path='/lectures' element={<PageCatalogLectures />} />
            <Route path='/lecture/:id' element={<PageReadLecture />} />
            <Route path='/labs' element={<PageCatalogLabs />} />
            <Route path='/lab/:id' element={<PageReadLab />} />
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
