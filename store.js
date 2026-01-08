let filmsInWatchlist = []
const filmsInStorage = JSON.parse(localStorage.getItem('User Data'))

if (filmsInStorage) {
    filmsInWatchlist = filmsInStorage
}

export function getWatchlist() {
    return filmsInWatchlist
}

export function setWatchlist(newList) {
    filmsInWatchlist = newList
    localStorage.setItem('User Data', JSON.stringify(filmsInWatchlist))
}

export function addFilm(film) {
    filmsInWatchlist.push(film)
    localStorage.setItem('User Data', JSON.stringify(filmsInWatchlist))
}

export function removeFilm(id) {
    filmsInWatchlist = filmsInWatchlist.filter(
        item => item.imdbID !== id
    )
    localStorage.setItem('User Data', JSON.stringify(filmsInWatchlist))
}
