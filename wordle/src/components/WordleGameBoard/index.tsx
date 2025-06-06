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
          <p>Congratulation, you won the game! </p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </>
      }
      {attemptsLeft == 1 && !isGameWon &&<p>No more attempt, the correct word was : {wordToGuess}</p>}
      {errorMessage}
    </div>
  )
}
