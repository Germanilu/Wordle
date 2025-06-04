import { useEffect } from "react"
import { useWordleStore } from "./store"

function App() {

  const createGame = useWordleStore((state) => state.createGameId)
  useEffect(() => {
    createGame()
  },[])

  return (
    <>
     <h1>Wordle</h1>
    </>
  )
}

export default App
