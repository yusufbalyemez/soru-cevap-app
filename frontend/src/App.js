import AddQuestion from "./components/Questions/AddQuestion";
import AllTests from "./components/Questions/AllTests";
import QuestionCard from "./components/Questions/QuestionCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestDetails from "./components/Questions/TestDetails";
import EditTest from "./components/Questions/EditTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionCard />} />
        <Route path="/soru-ekle" element={<AddQuestion />} />
        <Route path="/testler" element={<AllTests />} />
        <Route path="/tests/:testIndex" element={<TestDetails />} />
        <Route path="/edit-test/:testIndex" element={<EditTest />} />
      </Routes>
    </Router>
  );
}

export default App;
