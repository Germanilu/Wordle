import { useEffect } from 'react'
import WordleGrid from '../Grid'
import useWordle from '../../hooks/useWordle'
import { useWordleStore } from '../../store'

export default function WordleGame() {
    const { handleKeyUp } = useWordle()
    const isGameWon = useWordleStore((state) => state.guessResult?.isGameWon)
    const attemptsLeft = useWordleStore((state) => state.gameInfo.attemptsLeft)
    const wordToGuess = useWordleStore((state) => state.gameInfo.wordToGuess)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [])
    return (
        <>
            <WordleGrid />
            {isGameWon &&
                <p>Congratulation, you won the game! </p>
            }
            {attemptsLeft == 1 &&
                <p>No more attempt, the correct word was : {wordToGuess}</p>
            }
        </>
    )
}
