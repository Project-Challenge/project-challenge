import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/blogs" element={<>blogs</>} />
        <Route path="/contact" element={<>cont</>} />
        <Route path="*" element={<>Error 404: Page not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
