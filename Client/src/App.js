import Head from './components/App'
import LoveCalculator from "./components/LoveCalculator";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlamesCalculator from './components/FlamesCalculator';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Head />} />
        <Route path="/LoveCalculator" element={<LoveCalculator />} />
         <Route path="/FlamesCalculator" element={<FlamesCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;

