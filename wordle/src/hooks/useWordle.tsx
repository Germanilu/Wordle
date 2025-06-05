import { useState } from "react";
import { useWordleStore } from "../store";

const useWordle = () => {
    const [index, setIndex] = useState(0)
    const addLetter = useWordleStore((state) => state.addLetter);
    const removeLetter = useWordleStore((state) => state.removeLetter);
    const sendRequest = useWordleStore((state) => state.sendRequest);
    const localGuesses = useWordleStore((state)=> state.localGuesses)
    const gameId = useWordleStore((state)=> state.gameInfo.gameId)

    const handleKeyUp = (e: KeyboardEvent) => {

        const key = e.key.toUpperCase()
        if (/^[A-Z]$/.test(key)) {
            addLetter(key);
        }

        if (key === 'BACKSPACE') {
            removeLetter()
        }

        if (key === 'ENTER') {
            if (localGuesses[index].length < 5) {
                console.log('es menor q 5')
            }
            const word = localGuesses[index].join("")
            sendRequest(gameId, word)
            setIndex(prev => prev + 1)
        }
    }

    return { handleKeyUp }
}

export default useWordle;