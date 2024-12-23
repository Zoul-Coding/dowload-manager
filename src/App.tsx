import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListFilePicture from './pages/ListFilePicture';
import ScrollToTop from '../ScrollToTop';
import ListFileVideo from './pages/ListFileVideo';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/picture" element={<ListFilePicture />} />
          <Route path="/video" element={<ListFileVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

