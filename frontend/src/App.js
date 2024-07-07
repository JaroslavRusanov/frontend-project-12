import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import NotFound from './components/NotFound/NotFound.jsx';

const App = () => (
  <div className="h-100 bg-light">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
        </nav>
        <BrowserRouter>
          <Routes>
            {}
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </div>
);

export default App;
