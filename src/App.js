import "./App.scss";
import Layout from "./Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:tabId" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
