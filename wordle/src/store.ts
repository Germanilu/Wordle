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


export const useWordleStore = create<WordleStore>()(devtools((set) => ({

     gameInfo: {
        guesses: [],
        gameId: "",
        status: "",
        attemptsLeft: 5,
        wordToGuess: ""
    },

    createGameId: async() => {
        const {gameId} = await createGame()
        if (gameId) {
            const gameInfo = await getGameInfo(gameId)
            set(() => ({
                gameInfo
            }))
        }
    }
})))