import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import AuthProvider from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes'
import UserChallenges from './pages/UserChallenges'
import AddChallenge from './pages/AddChallenge'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PATHS } from './const/paths'
function App() {
  return (
    <>
      <ToastContainer
        hideProgressBar={true}
        pauseOnHover={false}
        autoClose={2000}
      />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={PATHS.logScreen} element={<LogIn />} />
            <Route path={PATHS.register} element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path={PATHS.challenges} element={<UserChallenges />} />
              <Route path={PATHS.addChalenge} element={<AddChallenge />} />
              <Route path='*' element={<>Error 404: Page not found</>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
