export const useSearchRes = () => useState('searchRes', () => '')
export const useFav = () => useState('fav', () => [])


export const initFavFromLocalStorage = () => {
    const fav = useState('fav')
    fav.value = getLocalStorage() || []
}
