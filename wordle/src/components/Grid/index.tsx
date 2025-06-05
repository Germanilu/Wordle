import { useWordleStore } from '../../store'
import WordleRow from '../Row'
import styles from './index.module.scss'


export default function Grid() {
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
