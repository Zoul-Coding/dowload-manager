import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListFilePicture from './pages/ListFilePicture';
import ScrollToTop from '../ScrollToTop';
import ListFileVideo from './pages/ListFileVideo';
import ListFilePdf from './pages/ListFilePdf';
import ListFileDownload from './pages/ListFileDownload';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/picture" element={<ListFilePicture />} />
          <Route path="/video" element={<ListFileVideo />} />
          <Route path="/pdf" element={<ListFilePdf />} />
          <Route path="/download" element={<ListFileDownload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

