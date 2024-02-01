export const saveLocalStorage = (fav) => {
    if (process.client) {
        window.localStorage.setItem('fav', JSON.stringify(fav));
    }
}


export const getLocalStorage = () => {
    if (process.client) {
        return JSON.parse(window.localStorage.getItem('fav'));
    }
}



