import { useEffect } from "react"
import { useWordleStore } from "./store"
import WordleGameBoard from "./components/WordleGameBoard"

function App() {

  const createGame = useWordleStore((state) => state.createGameId)
  useEffect(() => {
    createGame()
  },[])

  return (
    <>
     <h1>Wordle</h1>
     <WordleGameBoard/>
    </>
  )
}

export default App
