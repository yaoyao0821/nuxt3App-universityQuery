export const deleteInFav = (row) => {
    const fav = useFav()
    if (fav.value && isInFav(row)) {
      fav.value = fav.value.filter((item) => item.name != row.name);
      saveFavLocalStorage(fav.value)
    }
}

export const isInFav = (row) => {
    const fav = useFav()
    if (fav.value) {
        const index = fav.value.findIndex((item) => item.name === row.name)
        return index < 0 ? false : true
      }
      return false
}
export const addInFav = (row) => {
    const fav = useFav()
    if (fav.value && !isInFav(row)) {
      fav.value.push(row)
      saveFavLocalStorage(fav.value)
    }
}
