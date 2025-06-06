import styles from './index.module.scss'

type LetterWithStatus = {
  letter: string;
  status?: '0' | '1' | '2';
};

type RowProps = {
  guess: LetterWithStatus[];
};


/**
 * @component WordleRow component displays a single row of 5 cells. 
 * Each cell shows a letter and a color-coded background depending on its status
 * 
 * @param guess Structure: [{letter:'E', status:'2'},{letter:'S', status:'2'},{letter:'A', status:'2'},{letter:'V', status:'2'},{letter:'E', status:'2'}]
 */
export default function WordleRow({ guess }: RowProps) {

  return (
    <div className={styles.row}>
      {Array.from({ length: 5 }).map((_, i) => {
        const cell = guess[i] || { letter: '', status: undefined };
        let styledCell = styles.empty;

        if(cell.status === '0'){
          styledCell = styles.absent
        }else if(cell.status === '1'){
          styledCell = styles.present
        }else if(cell.status === '2'){
          styledCell = styles.correct
        }

        return (
          <div key={i} className={`${styles.cell} ${styledCell}`} data-testid="cell">
            {cell.letter}
          </div>
        );
      })}
    </div>
  );
}