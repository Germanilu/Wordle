import { create } from 'zustand';
import axios from 'axios'


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


export const useWordleStore = create(() => ({

    createGameId: async() => {
        const {gameId} = await createGame()
        console.log(gameId)
    }
}))