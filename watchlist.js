import {
    getWatchlist,
    setWatchlist,
    removeFilm
} from './store.js'

import {
    generateFilmsInPage
} from './render.js'

const content = document.getElementById('watchlist')

let filmsInWatchlist = getWatchlist()
console.log(filmsInWatchlist)

if (filmsInWatchlist.length > 0) {
    content.innerHTML = generateFilmsInPage(filmsInWatchlist, filmsInWatchlist)
}

document.addEventListener('click', e => {
    const btn = e.target.closest('[data-watchlist]')
    if (!btn) return
    handleRemoveBtn(btn)
})

function handleRemoveBtn(btn) {
    filmsInWatchlist = filmsInWatchlist.filter(
            item => item.imdbID !== btn.dataset.watchlist)
            
    const filmCard = btn.closest('.film-card')
    setWatchlist(filmsInWatchlist)
    if (!filmCard) {
        console.error('cant find .film-card')
        return
    }

    filmCard.style.display = 'none'
    
    if (filmsInWatchlist.length === 0) {
        content.innerHTML = `
            <div id="watchlist-msg" class="msg">
                <p>Your watchlist is looking a little empty...</p>
            </div>
        
        `
    }
}