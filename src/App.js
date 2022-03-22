import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import config from './Config.json';
import Header from './Header';
import PageAdmin from './PageAdmin';
import PageAdminUsers from './PageAdmin/PageAdminUsers/PageMain';
import PageAdminLectures from './PageAdmin/PageAdminLectures/PageMain';
import PageAdminTests from './PageAdmin/PageAdminTests/PageMain';
import PageAdminLabs from './PageAdmin/PageAdminLabs/PageMain';
import PageAdminEditUser from './PageAdmin/PageAdminUsers/PageEditUser';
import PageAdminEditLecture from './PageAdmin/PageAdminLectures/PageEditLecture';
import PageAdminEditChapter from './PageAdmin/PageAdminLectures/PageEditChapter';
import PageAdminEditTest from './PageAdmin/PageAdminTests/PageEditTest';
import PageAdminEditLab from './PageAdmin/PageAdminLabs/PageEditLab';
import PageMain from './PageMain';
import PageCatalogLectures from './PageLectures/PageCatalogLectures';
import PageReadLecture from './PageLectures/PageReadLecture';
import PageCatalogLabs from './PageLabs/PageCatalogLabs';
import PageReadLab from './PageLabs/PageReadLab';
import PageCatalogTests from './PageTests/PageCatalogTests';
import PagePassTest from './PageTests/PagesPassTest/PagePassTest';
import PageResultTest from './PageTests/PagesPassTest/PageResultTest';
import PageConfirmRegister from './PageProfile/PageConfirmRegister';
import PageProfile from './PageProfile';
import PageProfileAllResults from './PageProfile/PageAllResults';
import PageError404 from './PageError404';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Router >
          <Routes>
            <Route path={config.frontHost + ''} element={<PageMain />} />
            <Route path={config.frontHost + 'admin'} element={<PageAdmin />} />
            <Route path={config.frontHost + 'admin/user/:id'} element={<PageAdminEditUser />} />
            <Route path={config.frontHost + 'admin/users'} element={<PageAdminUsers />} />
            <Route path={config.frontHost + 'admin/labs'} element={<PageAdminLabs />} />
            <Route path={config.frontHost + 'admin/lab/:id'} element={<PageAdminEditLab />} />
            <Route path={config.frontHost + 'admin/lecture/:id'} element={<PageAdminEditLecture />} />
            <Route path={config.frontHost + 'admin/lectures'} element={<PageAdminLectures />} />
            <Route path={config.frontHost + 'admin/chapter/:id'} element={<PageAdminEditChapter />} />
            <Route path={config.frontHost + 'admin/test/:id'} element={<PageAdminEditTest />} />
            <Route path={config.frontHost + 'admin/tests'} element={<PageAdminTests />} />
            <Route path={config.frontHost + 'lectures'} element={<PageCatalogLectures />} />
            <Route path={config.frontHost + 'lecture/:id'} element={<PageReadLecture />} />
            <Route path={config.frontHost + 'labs'} element={<PageCatalogLabs />} />
            <Route path={config.frontHost + 'lab/:id'} element={<PageReadLab />} />
            <Route path={config.frontHost + 'tests'} element={<PageCatalogTests />} />
            <Route path={config.frontHost + 'test/:id'} element={<PagePassTest />} />
            <Route path={config.frontHost + 'result/:id'} element={<PageResultTest />} />
            <Route path={config.frontHost + 'profile/results'} element={<PageProfileAllResults />} />
            <Route path={config.frontHost + 'profile/confirm'} element={<PageConfirmRegister />} />
            <Route path={config.frontHost + 'profile'} element={<PageProfile />} />
            <Route path="*" element={<PageError404 />} />

          </Routes>
        </Router>
      </main>
      <Footer />
    </>
  );
}

export default App;
