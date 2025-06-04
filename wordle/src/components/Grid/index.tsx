import WordleRow from '../Row'
import styles from './index.module.scss'
export default function Grid() {
  return (
    <div className={styles.grid}>
      <WordleRow/>
      <WordleRow/>
      <WordleRow/>
      <WordleRow/>
      <WordleRow/>
    </div>
  )
}
