export const useSearchRes = () => useState('searchRes', () => [])
export const useFav = () => useState('fav', () => [])
export const useName = () => useState('name', () => '')
export const useCountry = () => useState('country', () => '')

export const initFavFromLocalStorage = () => {
    const fav = useState('fav')
    const favlocal = getFavLocalStorage()
    fav.value = favlocal || []
}

export const initCountriesList = async () => {
    let countries = getCountriesLocalStorage()
    if (!countries) {
        const responseRaw = await fetch('http://universities.hipolabs.com/search')
        const responseJson = await responseRaw.json()
        const countriesSet = new Set()
        for (let item of responseJson) {
            countriesSet.add(item.country)
        }
        saveCountriesLocalStorage([...countriesSet])
    }
}