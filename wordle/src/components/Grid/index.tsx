import { useWordleStore } from '../../store'
import WordleRow from '../Row'
import styles from './index.module.scss'


export default function WordleGrid() {
  const localGuesses = useWordleStore((state) => state.localGuesses)

  return (
       <div className={styles.grid}>
      {localGuesses.map((guess) => (
        <WordleRow  guess={guess}  />
      ))}
    </div>
  )
}
