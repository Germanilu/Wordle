import { useWordleStore } from "../store";

const useWordle = () => {

    const addLetter = useWordleStore((state) => state.addLetter);

    const handleKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toUpperCase()
        if (/^[A-Z]$/.test(key)) {
            addLetter(key);
        }
    }

    return { handleKeyUp }
}

export default useWordle;