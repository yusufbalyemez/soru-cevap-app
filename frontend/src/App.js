import AddQuestion from "./components/Questions/AddQuestion";
import QuestionCard from "./components/Questions/QuestionCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionCard/>}/>
        <Route path="/soru-ekle" element={<AddQuestion/>}/>
      </Routes>
    </Router>
  );
}

export default App;
