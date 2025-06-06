import WordleRow from '../Row'
import { useWordleStore } from '../../store'
import styles from './index.module.scss'

/**
 * 
 * @component WordleGrid renders the 5-row Wordle game board.
 *  It pulls both confirmed guesses and current in-progress guesses from the store, and passes them to the WordleRow component for display.
 */
export default function WordleGrid() {
  
  const guesses = useWordleStore((state) => state.gameInfo.guesses)
  const localGuesses = useWordleStore((state) => state.localGuesses)

  return (
    <div className={styles.grid}>
      {Array.from({ length: 5 }).map((_, i) => {
        const finalizedGuess = guesses[i]
        const currentInput = localGuesses[i]

        if (finalizedGuess?.length) {
          return <WordleRow key={i} guess={finalizedGuess} />
        }

        return <WordleRow key={i} guess={currentInput.map(letter => ({ letter }))} />
      })}
    </div>
  )
}
