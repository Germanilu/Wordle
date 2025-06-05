import { create } from 'zustand';
import axios from 'axios'
import { devtools } from 'zustand/middleware'

type GameInfo = {
    gameId: string;
    status: string;
    attemptsLeft: number;
    wordToGuess: string;
    guesses: [];
}

type WordleStore = {
    gameInfo: GameInfo
    createGameId: () => Promise<void>
    addLetter: (key: string) => void
    removeLetter: () => void
    localGuesses: string[][]
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
        guesses: [],
        gameId: "",
        status: "",
        attemptsLeft: 5,
        wordToGuess: ""
    },
    localGuesses: Array(5).fill(null).map(() => []),

    createGameId: async() => {
        const {gameId} = await createGame()
        if (gameId) {
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

            return{
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
})))