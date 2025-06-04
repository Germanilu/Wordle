

const useWordle = () => {

    const handleKeyUp = (e:KeyboardEvent) => {
        const key = e.key.toUpperCase()
        console.log(key)
    }
    
    return {handleKeyUp}
}

export default useWordle;