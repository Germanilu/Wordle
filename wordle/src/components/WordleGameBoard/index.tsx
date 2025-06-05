import { useEffect } from 'react'
import WordleGrid from '../Grid'
import useWordle from '../../hooks/useWordle'

export default function WordleGame() {
      const {handleKeyUp} = useWordle()

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [])
    return (
        <>
            <WordleGrid/>
        </>
    )
}
