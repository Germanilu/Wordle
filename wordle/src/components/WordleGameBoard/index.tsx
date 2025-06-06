import { useEffect } from "react"
import WordleGrid from "../Grid"
import { useWordleStore } from "../../store"
import useWordle from "../../hooks/useWordle"
import styles from './index.module.scss'

/**
 * 
 * @component WordleGame -- handles the core gameplay interface.
 * It sets up the keyboard event listeners, displays the game board, and conditionally renders win/loss messages and game status.
 * 
 */
export default function WordleGame() {

  const { handleKeyUp } = useWordle()
  const isGameWon = useWordleStore((state) => state.guessResult?.isGameWon)
  const attemptsLeft = useWordleStore((state) => state.gameInfo.attemptsLeft)
  const wordToGuess = useWordleStore((state) => state.gameInfo.wordToGuess)
  const errorMessage = useWordleStore((state) => state.errorMessage);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])

  return (
    <div className={styles.main}>
      <WordleGrid />
      {isGameWon &&
        <>
          <p>Felicidades, ganaste el juego! </p>
          <button onClick={() => window.location.reload()}>Reiniciar</button>
        </>
      }
      {attemptsLeft == 1 && !isGameWon &&<p>No quedan más intentos, la palabra correcta era: {wordToGuess}</p>}
      {errorMessage}
    </div>
  )
}
