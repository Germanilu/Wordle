import { useEffect } from "react"
import { useWordleStore } from "./store"
import WordleGameBoard from "./components/WordleGameBoard"

function App() {
  const localGuesses = useWordleStore((state) => state.localGuesses)
  const createGame = useWordleStore((state) => state.createGameId)

  useEffect(() => {
    createGame()
  }, [])

  return (
    <>
      <h1>Wordle</h1>
      {!localGuesses[0].length && <p>Start typing something...</p>}
      <WordleGameBoard />
    </>
  )
}

export default App
