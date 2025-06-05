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
}

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
 * Zustand Store
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

    createGameId: async () => {
        const { gameId } = await createGame()
        if (gameId) {
            // Traer la info del juego creada
            const gameInfo = await getGameInfo(gameId)
            set(() => ({
                gameInfo
            }))
        }
    },

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
                    gameInfo: {
                        ...state.gameInfo,
                        attemptsLeft: data.attemptsLeft,
                        guesses: newGuesses,
                        status: data.isGameWon ? 'win' : 'playing',
                    },
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
})))