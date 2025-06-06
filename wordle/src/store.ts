import { create } from 'zustand';
import axios from 'axios'
import { devtools } from 'zustand/middleware'


type LetterStatus = {
    letter: string;
    status: '0' | '1' | '2';
};

type GameInfo = {
    gameId: string;
    status: string;
    attemptsLeft: number;
    wordToGuess: string;
    guesses: LetterStatus[][];
}

type WordleStore = {
    gameInfo: GameInfo
    createGameId: () => Promise<void>
    addLetter: (key: string) => void
    removeLetter: () => void
    sendRequest: (gameId: string, word: string) => void
    localGuesses: string[][]
    guessResult: { result: string; attemptsLeft: number; isGameWon: boolean } | null
    errorMessage: string | null;
}

/**
* Creates a new game by requesting a game ID from the backend.
*/
const createGame = async () => {
    try {
        const url = 'http://localhost:3000/game'
        const response = await axios.post(url)
        if (response.statusText === 'Created') {
            return response.data
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Helper function to get game info by game ID.
 * Returns full game info from the backend.
 * @param gameId The game ID to fetch info for Example: 66f38c23-7ee4-4bb2-bd6a-a699c03b93e7
 */
const getGameInfo = async (gameId: string) => {
    try {
        const url = `http://localhost:3000/game/${gameId}`
        const response = await axios.get(url)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}


/**
 * Zustand store for managing the Wordle game state
 */
export const useWordleStore = create<WordleStore>()(devtools((set) => ({

    gameInfo: {
        guesses: Array(5).fill([]).map(() => []),
        gameId: "",
        status: "",
        attemptsLeft: 5,
        wordToGuess: ""
    },
    localGuesses: Array(5).fill(null).map(() => []),
    errorMessage: null,


    /**
     * Async action to create a new game and fetch initial game info.
     * Updates the store with the fresh gameInfo.
     */
    createGameId: async () => {
        const { gameId } = await createGame()
        if (gameId) {
            const gameInfo = await getGameInfo(gameId)
            set(() => ({
                gameInfo
            }))
        }
    },


    /**
     * Adds a letter to the current guess (localGuesses).
     * Prevents adding more than 5 letters per guess.
     */
    addLetter: (letter: string) => {
        set((state) => {
            const updatedGuesses = [...state.localGuesses]
            const rowIndex = state.gameInfo.guesses.length
            const currentRow = updatedGuesses[rowIndex] || []
            if (currentRow.length >= 5) return {}

            updatedGuesses[rowIndex] = [...currentRow, letter]

            return {
                localGuesses: updatedGuesses
            }
        });
    },

    /**
     * Removes the last letter from the current guess (localGuesses).
     */
    removeLetter: () => {
        set((state) => {
            const updatedGuesses = [...state.localGuesses]
            const rowIndex = state.gameInfo.guesses.length
            const currentRow = updatedGuesses[rowIndex] || [];
            if (currentRow.length === 0) return {};
            updatedGuesses[rowIndex] = currentRow.slice(0, -1);
            return {
                localGuesses: updatedGuesses
            }
        })
    },

    /**
     * Sends the current guess to the backend for validation.
     * Updates the store with the results, guesses, attempts left, and game status.
     * Handles errors by setting an error message in the state.
     * 
     * @param gameId Current game identifier Example: 66f38c23-7ee4-4bb2-bd6a-a699c03b93e7
     * @param word The guessed word to send Example: 'ESAVE'
     */
    sendRequest: async (gameId, word) => {
        try {
            const url = `http://localhost:3000/game/${gameId}/guess?guessWord=${word}`
            const response = await axios.post(url)
            const { data } = response
            set((state) => {

                const formattedGuess: LetterStatus[] = word.split('').map((letter, i) => ({
                    letter,
                    status: data.result[i] as '0' | '1' | '2',
                }));
                const newGuesses = [...state.gameInfo.guesses, formattedGuess];
                return {
                    guessResult: data,
                    errorMessage: null,
                    gameInfo: {
                        ...state.gameInfo,
                        attemptsLeft: data.attemptsLeft,
                        guesses: newGuesses,
                        status: data.isGameWon ? 'win' : 'playing',
                    },
                }
            })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                set({ errorMessage: error.response.data.msg });
            } else {
                set({ errorMessage: 'Unknown error occurred' });
            }
        }
    },
})))