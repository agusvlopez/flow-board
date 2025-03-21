import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BoardPage } from './pages/BoardPage'
import { HomePage } from "./pages/HomePage"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/board/:id" Component={BoardPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App
