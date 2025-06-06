import { useWordleStore } from "../store";

/**
 * Custom hook to manage keyboard input logic for the Wordle game.
 * 
 * It handles key events and communicates with the Zustand store
 * to update local guesses, remove letters, or submit words.
 */
const useWordle = () => {
    const addLetter = useWordleStore((state) => state.addLetter);
    const removeLetter = useWordleStore((state) => state.removeLetter);
    const sendRequest = useWordleStore((state) => state.sendRequest);
    const localGuesses = useWordleStore((state) => state.localGuesses)
    const gameId = useWordleStore((state) => state.gameInfo.gameId)
    const guesses = useWordleStore((state) => state.gameInfo.guesses);
    const isGameWon = useWordleStore((state) => state.guessResult?.isGameWon)
    const setErrorMessage = useWordleStore((state) => state.setErrorMessage);
    const index = guesses.length || 0;

    /**
     * @Function handleKeyUp
     * Handles keyboard input for the game
     * 
     * - Adds a letter to the current guess if a valid character key is pressed.
     * - Removes a letter when Backspace is pressed.
     * - Submits the guess if Enter is pressed and 5 letters are entered.
     * 
     * @param e KeyboardEvent
     * @returns 
     */
    const handleKeyUp = (e: KeyboardEvent) => {

        if (isGameWon) return;
        const key = e.key.toUpperCase()
        if (/^[A-Z]$/.test(key)) {
            addLetter(key);
        }

        if (key === 'BACKSPACE') {
            removeLetter()
        }

        if (key === 'ENTER') {
            if (localGuesses[index].length < 5) {
                setErrorMessage('La palabra debe tener 5 letras');
                return
            }
            const word = localGuesses[index].join("")
            sendRequest(gameId, word)
        }
    }

    return { handleKeyUp }
}

export default useWordle;