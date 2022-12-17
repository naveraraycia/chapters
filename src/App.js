import {BrowserRouter as Router ,Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// toast CSS
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import EditProfile from './pages/EditProfile'
import Chapter from './pages/Chapter'
import PrivateRoute from './components/PrivateRoute'
import ChapterItem from './pages/ChapterItem'

function App() {
  document.body.style.backgroundColor = '#E0F7FA'
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/*' element={<NotFound />} />

          <Route path='/home' element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
          </Route>

          <Route path='/edit-profile' element={<PrivateRoute />}>
            <Route path='/edit-profile' element={<EditProfile />} />
          </Route>

          <Route path='/chapter/:entryId' element={<PrivateRoute />}>
            <Route path='/chapter/:entryId' element={<ChapterItem />} />
          </Route>

          <Route path='/chapter/' element={<PrivateRoute />}>
            <Route path='/chapter/' element={<Chapter />} />
          </Route>

        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
