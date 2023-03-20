import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn'
import AuthProvider from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes'
import UserChallenges from './pages/UserChallenges'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (<>
  <ToastContainer
  hideProgressBar={true}
  pauseOnHover={false}
  autoClose={2000}
  />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/LogIn' element={<LogIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/challenges' element={<UserChallenges />} />
            <Route path='/contact' element={<>cont</>} />
            <Route path='*' element={<>Error 404: Page not found</>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
