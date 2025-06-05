import styles from './index.module.scss'

type RowProps = {
    guess: string[]
}

export default function WordleRow({guess}: RowProps) {
  return (
    <div className={styles.row}>
         {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          {guess[i] || ''}
        </div>
      ))}
    </div>
  )
}