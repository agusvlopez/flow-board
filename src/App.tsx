import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
//import { useState } from 'react';
import { Board } from './components/Board';
import { Menu } from './components/Menu'
import { useBoardsStore } from './store/boards'
import { BoardPage } from './pages/BoardPage';

function Home() {
  const boards = useBoardsStore(state => state.boards)

  return (
    <>
      <h1>Flow board</h1>
      <Menu />
      <div className='boards-container'>
        {boards.map((b) => {
          return (
            <NavLink to={`/board/${b.id}`} style={{ textDecoration: 'none' }}>
              <Board board={b} />
            </NavLink>
          )
        })}
      </div>
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/board/:id" Component={BoardPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App
