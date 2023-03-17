import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogIn from './pages/LogIn'
import AuthProvider from './context/AuthContext'
import PrivateRoutes from './utils/PrivateRoutes'
import Blogs from './pages/Blogs'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/LogIn' element={<LogIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/contact' element={<>cont</>} />
            <Route path='*' element={<>Error 404: Page not found</>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
