import { useWordleStore } from "../store";

const useWordle = () => {

    const addLetter = useWordleStore((state) => state.addLetter);
    const removeLetter = useWordleStore((state) => state.removeLetter);

    const handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toUpperCase()
        if (/^[A-Z]$/.test(key)) {
            addLetter(key);
        }

        if (key === 'BACKSPACE') {
            removeLetter()
        }

        if( key === 'ENTER'){
            console.log("send req to api")
        }
    }

    return { handleKeyUp }
}

export default useWordle;