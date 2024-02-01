const saveLocalStorage = (key) => (val) => {
    if (process.client) {
        window.localStorage.setItem(key, JSON.stringify(val))
    }
}

export const saveFavLocalStorage = saveLocalStorage('fav')
export const saveCountriesLocalStorage = saveLocalStorage('countries')

const getLocalStorage = (key) => () => {
    if (process.client) {
        return window.localStorage.getItem(key) ? 
        JSON.parse(window.localStorage.getItem(key)) : ''
    }
}

export const getFavLocalStorage = getLocalStorage('fav')
export const getCountriesLocalStorage = getLocalStorage('countries')



