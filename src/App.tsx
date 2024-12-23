import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DragAndDropZone from './pages/components/DragAndDropZone';
import ScrollToTop from '../ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DragAndDropZone />
      <Routes>
          {/* <Route path="/inscription" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

