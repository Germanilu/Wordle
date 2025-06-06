import { useWordleStore } from "../store";

const useWordle = () => {
    const addLetter = useWordleStore((state) => state.addLetter);
    const removeLetter = useWordleStore((state) => state.removeLetter);
    const sendRequest = useWordleStore((state) => state.sendRequest);
    const localGuesses = useWordleStore((state)=> state.localGuesses)
    const gameId = useWordleStore((state)=> state.gameInfo.gameId)
    const guesses = useWordleStore((state) => state.gameInfo.guesses);
    const index = guesses.length || 0;
    const isGameWon = useWordleStore((state) => state.guessResult?.isGameWon)
    
    const handleKeyUp = (e: KeyboardEvent) => {
        
        if(isGameWon) return;
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
                return 
            }
            const word = localGuesses[index].join("")
            sendRequest(gameId, word)
        }
    }

    return { handleKeyUp }
}

export default useWordle;