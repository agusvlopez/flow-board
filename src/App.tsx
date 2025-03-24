import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BoardPage } from './pages/BoardPage'
import { HomePage } from "./pages/HomePage"
import { DefaultLayout } from "./Layouts/Default";


function App() {
  return (
    <>
      <Router>
        <DefaultLayout>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/board/:id" Component={BoardPage} />
          </Routes>
        </DefaultLayout>
      </Router>
    </>
  );
}

export default App
