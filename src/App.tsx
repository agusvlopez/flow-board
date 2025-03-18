import { Board } from './components/Board';
import { Menu } from './components/Menu'
import { useBoardsStore } from './store/boards'

function App() {
  const boards = useBoardsStore(state => state.boards)
  console.log("boards", boards);

  return (
    <>
      <h1>Flow board</h1>
      <Menu />
      <div className='boards-container'>
        {boards.map((b) => {
          return (
            <Board key={b.id} id={b.id} name={b.name} />
          )
        })}
      </div>
    </>
  )
}

export default App
