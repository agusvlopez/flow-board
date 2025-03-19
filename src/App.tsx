import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
//import { useState } from 'react';
import { Board } from './components/Board';
import { Menu } from './components/Menu'
import { useBoardsStore } from './store/boards'
import { Board as BoardType } from './types';
import { BoardPage } from './pages/BoardPage';

function Home() {
  const navigate = useNavigate();

  // const [isBoard, setIsBoard] = useState(false)
  // const [boardSelected, setBoardSelected] = useState<BoardType>()
  const boards = useBoardsStore(state => state.boards)
  console.log("boards", boards);

  const handleOpenBoard = (board: BoardType) => {
    navigate(`/board/${board.id}`);
    // setIsBoard(true)
    // setBoardSelected(board)
  }

  return (
    <>
      <h1>Flow board</h1>
      <Menu />
      <div className='boards-container'>
        {boards.map((b) => {
          return (
            <div key={b.id} onClick={() => handleOpenBoard(b)} style={{ cursor: 'pointer' }}>
              <Board board={b} />
            </div>
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
