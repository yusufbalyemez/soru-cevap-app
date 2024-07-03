import AddQuestion from "./components/Questions/AddQuestion";
import AllTests from "./components/Questions/AllTests";
import QuestionCard from "./components/Questions/QuestionCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestDetails from "./components/Questions/TestDetails";
import EditTest from "./components/Questions/EditTest";
import Navbar from "./components/Menu/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/sorular" element={<QuestionCard />} />
        <Route path="/soru-ekle" element={<AddQuestion />} />
        <Route path="/testler" element={<AllTests />} />
        <Route path="/tests/:testId" element={<TestDetails />} />
        <Route path="/edit-test/:testId" element={<EditTest />} />
      </Routes>
    </Router>
  );
}

export default App;